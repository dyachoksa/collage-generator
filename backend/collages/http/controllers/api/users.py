from starlette.authentication import requires
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.types import Scope, Receive, Send

from collages.data.entities import User
from collages.http.schemas import UserSchema
from collages.services import UsersService


class UserController(HTTPEndpoint):
    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.users_service = UsersService()

    def format_response(self, user: User) -> Response:
        schema = UserSchema()

        user_data = schema.dump(user)

        return JSONResponse({"success": True, "result": user_data})

    @requires("user")
    async def get(self, request: Request):
        user_id = request.path_params["user_id"]

        assert user_id == request.user.id

        user = await self.users_service.get_by_id(user_id)

        return self.format_response(user)

    @requires("user")
    async def put(self, request: Request):
        user_id = request.path_params["user_id"]

        assert user_id == request.user.id

        user = await self.users_service.get_by_id(user_id)

        schema = UserSchema(obj=user)
        user = schema.load(await request.json())

        await self.users_service.update(user)

        return self.format_response(user)
