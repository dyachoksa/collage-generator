from starlette.authentication import requires
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import PlainTextResponse
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT
from starlette.types import Receive, Scope, Send

from collages.data.entities import Collage
from collages.http.schemas import CollageSchema
from collages.services import CollagesService
from .base import format_collage_response


class CollagesController(HTTPEndpoint):
    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.collages_service = CollagesService()

    @requires("user")
    async def get(self, request: Request):
        user = request.user

        collages = await self.collages_service.find_by_user_id(user.id)

        return format_collage_response(request, collages, many=True)

    @requires("user")
    async def post(self, request: Request):
        schema = CollageSchema()

        user = request.user

        collage: Collage = schema.load(await request.json())

        await self.collages_service.create(user, collage)

        return format_collage_response(request, collage, status_code=HTTP_201_CREATED)


class CollageController(HTTPEndpoint):
    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.collages_service = CollagesService()

    @requires("user")
    async def get(self, request: Request):
        collage_id = request.path_params["collage_id"]

        collage = await self.collages_service.get_by_id(collage_id)

        return format_collage_response(request, collage)

    @requires("user")
    async def put(self, request: Request):
        collage_id = request.path_params["collage_id"]

        collage = self.collages_service.get_by_id(collage_id)

        schema = CollageSchema(obj=collage)

        collage = schema.load(await request.json())

        await self.collages_service.update(collage)

        return format_collage_response(request, collage)

    @requires("user")
    async def delete(self, request: Request):
        collage_id = request.path_params["collage_id"]

        collage = await self.collages_service.get_by_id(collage_id)

        await self.collages_service.remove(collage)

        return PlainTextResponse("", status_code=HTTP_204_NO_CONTENT)


class CollageGeneratorController(HTTPEndpoint):
    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.collages_service = CollagesService()

    @requires("user")
    async def post(self, request: Request):
        collage_id = request.path_params["collage_id"]

        collage = await self.collages_service.get_by_id(collage_id)

        await self.collages_service.generate(collage)

        return format_collage_response(request, collage)
