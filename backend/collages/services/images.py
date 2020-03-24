import os

import typing
import uuid
from io import BytesIO

import aiofiles
from PIL import Image
from starlette.concurrency import run_in_threadpool
from starlette.datastructures import UploadFile

from collages import settings
from collages.data.entities import Collage, CollageImage


class ImagesService:
    async def upload_images(self, collage: Collage, images: typing.List[UploadFile]):
        storage_dir = ImagesService.get_collage_dir(collage)
        await run_in_threadpool(ImagesService.check_storage_dir, storage_dir)

        uploaded_images = []
        for image in images:
            _, file_extension = os.path.splitext(image.filename)
            filename = "{}{}".format(uuid.uuid4(), file_extension)

            try:
                async with aiofiles.open(
                    os.path.join(storage_dir, filename), mode="wb"
                ) as f:
                    await f.write(await image.read())
            except IOError:
                pass
            else:
                uploaded_images.append(filename)

        collage.source_images += uploaded_images

    async def remove_images(self, collage: Collage, images: typing.List[str]):
        storage_dir = ImagesService.get_collage_dir(collage)

        for image in images:
            if image not in collage.source_images:
                continue

            await run_in_threadpool(
                ImagesService.remove_image_from_storage, storage_dir, image
            )

            collage.source_images.remove(image)

    def load_source_images_info(self, collage: Collage) -> typing.List[CollageImage]:
        storage_dir = ImagesService.get_collage_dir(collage)

        return [
            self.load_image_info(storage_dir, image) for image in collage.source_images
        ]

    def load_image_info(self, storage_dir: str, image_name: str) -> CollageImage:
        full_path = os.path.join(storage_dir, image_name)

        image: Image.Image = Image.open(full_path)

        return CollageImage(
            name=image_name,
            aspect=image.width / image.height,
            height=image.height,
            width=image.width,
        )

    def save_image_data(self, collage: Collage, image_data: Image.Image) -> str:
        filename = str(uuid.uuid4()) + ".jpg"

        storage_dir = ImagesService.get_collage_dir(collage)

        image_data.save(os.path.join(storage_dir, filename), "JPEG")
        return filename

    async def load_image_data(self, collage: Collage, image: str) -> Image.Image:
        storage_dir = ImagesService.get_collage_dir(collage)
        full_path = os.path.join(storage_dir, image)

        async with aiofiles.open(full_path, mode="rb") as f:
            image_bytes = await f.read()

        return Image.open(BytesIO(image_bytes))

    @staticmethod
    def remove_image_from_storage(storage_dir: str, image: str):
        full_path = os.path.join(storage_dir, image)

        if os.path.exists(full_path) and os.path.isfile(full_path):
            os.unlink(full_path)

    @staticmethod
    def get_collage_dir(collage: Collage):
        """Returns full system path to the collage images storage directory"""
        return os.path.join(
            settings.COLLAGES_STORAGE_DIR, str(collage.user_id), str(collage.id)
        )

    @staticmethod
    def check_storage_dir(storage_dir: str):
        if os.path.exists(storage_dir) and os.path.isdir(storage_dir):
            return

        if os.path.exists(storage_dir) and not os.path.isdir(storage_dir):
            raise ValueError("Collage storage is not an directory")

        os.makedirs(storage_dir)
