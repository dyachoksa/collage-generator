from starlette.authentication import requires
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.types import Send, Receive, Scope

from collages.services import ImagesService, CollagesService

from .base import format_collage_response


class ImagesController(HTTPEndpoint):
    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.images_service = ImagesService()
        self.collages_service = CollagesService()

    @requires("user")
    async def post(self, request: Request):
        collage_id = int(request.query_params["collage_id"])

        collage = await self.collages_service.get_by_id(collage_id)

        form_data = await request.form()

        await self.images_service.upload_images(collage, form_data.getlist("image"))

        await self.collages_service.update(collage)

        return format_collage_response(request, collage)

    @requires("user")
    async def delete(self, request: Request):
        collage_id = int(request.query_params["collage_id"])

        collage = await self.collages_service.get_by_id(collage_id)

        image_paths = request.query_params["image"].split(",")

        await self.images_service.remove_images(collage, image_paths)
        await self.collages_service.update(collage)

        return format_collage_response(request, collage)


class ImageController(HTTPEndpoint):
    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.images_service = ImagesService()
        self.collages_service = CollagesService()

    @requires("user")
    async def delete(self, request: Request):
        image_path = request.path_params["image"]

        collage_id = int(request.query_params["collage_id"])

        collage = await self.collages_service.get_by_id(collage_id)

        await self.images_service.remove_images(collage, [image_path])
        await self.collages_service.update(collage)

        return format_collage_response(request, collage)
