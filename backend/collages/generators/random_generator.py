"""Random-based BRIC collage generator"""
import math
from random import shuffle

from PIL import Image, ImageOps
from starlette.concurrency import run_in_threadpool

from collages.data.entities import Collage, CollageImage, CollageNode
from collages.services.images import ImagesService


class RandomGenerator(object):
    def __init__(self, collage: Collage, size=(1920, 1080), border=None):
        self.target_size = size
        self.target_aspect = float(size[0]) / size[1]
        self.border = (
            border
            if border is not None
            else math.ceil((size[0] if size[0] > size[1] else size[1]) * 0.005)
        )
        self.collage = collage
        self.images_service = ImagesService()

    async def generate(self):
        images = await run_in_threadpool(
            self.images_service.load_source_images_info, self.collage
        )

        shuffle(images)

        root_node = self.build_tree(images, self.target_aspect >= 0)
        root_node = self.adjust_aspect(root_node)
        root_node = self.adjust_sizes(root_node)

        collage_result = await self.build_collage_image(root_node)
        if self.border:
            collage_result = ImageOps.expand(collage_result, self.border, "white")

        # note: does not update database, just store file
        return await run_in_threadpool(
            self.images_service.save_image_data, self.collage, collage_result
        )

    def build_tree(self, images, is_vertical_split=True):
        n = len(images)

        if n == 1:
            node = CollageNode(images[0])
            node.is_leaf = True
            return node

        node = CollageNode(CollageImage())
        node.is_leaf = False
        node.is_vertical_split = is_vertical_split

        node.left = self.build_tree(images[: n // 2], not is_vertical_split)
        node.right = self.build_tree(images[n // 2 :], not is_vertical_split)

        return node

    def adjust_aspect(self, node: CollageNode):
        if node.is_leaf:
            return node

        node.left = self.adjust_aspect(node.left)
        left_aspect = node.left.image.aspect

        node.right = self.adjust_aspect(node.right)
        right_aspect = node.right.image.aspect

        if node.is_vertical_split:
            aspect = left_aspect + right_aspect
        else:
            aspect = (left_aspect * right_aspect) / (left_aspect + right_aspect)

        node.image.aspect = aspect

        return node

    def adjust_sizes(self, node: CollageNode, parent: CollageNode = None):
        if parent is None:
            if node.is_vertical_split:
                node.image.width = self.target_size[0]
                node.image.height = math.ceil(node.image.width / node.image.aspect)
            else:
                node.image.height = self.target_size[1]
                node.image.width = math.ceil(node.image.height * node.image.aspect)
        else:
            if parent.is_vertical_split:
                node.image.height = parent.image.height
                node.image.width = math.ceil(node.image.height * node.image.aspect)
            else:
                node.image.width = parent.image.width
                node.image.height = math.ceil(node.image.width / node.image.aspect)

        if not node.is_leaf:
            node.left = self.adjust_sizes(node.left, node)
            node.right = self.adjust_sizes(node.right, node)

        return node

    async def build_collage_image(self, node: CollageNode):
        if node.is_leaf:
            source_image = await self.images_service.load_image_data(
                self.collage, node.image.name
            )
            return ImageOps.expand(
                ImageOps.fit(
                    source_image,
                    (
                        node.image.width - 2 * self.border,
                        node.image.height - 2 * self.border,
                    ),
                    method=Image.LANCZOS,
                ),
                self.border,
                fill="white",
            )

        image = Image.new("RGB", (node.image.width, node.image.height), color="white")

        left_image = await self.build_collage_image(node.left)
        right_image = await self.build_collage_image(node.right)

        image.paste(left_image, (0, 0))

        if not node.is_vertical_split:
            position = (0, node.image.height - node.right.image.height)
        else:
            position = (node.image.width - node.right.image.width, 0)

        image.paste(right_image, position)

        return image
