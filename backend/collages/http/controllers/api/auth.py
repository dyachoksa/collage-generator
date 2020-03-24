from marshmallow import ValidationError
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.status import HTTP_201_CREATED, HTTP_200_OK
from starlette.types import Scope, Receive, Send

from collages import settings
from collages.constants import AUTH_COOKIE_NAME
from collages.data.entities import User
from collages.errors import EntityDoesNotExistError, AuthError
from collages.http.schemas import UserSchema
from collages.services import AuthService, UsersService


class BaseAuthController(HTTPEndpoint):
    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.auth_service = AuthService()
        self.users_service = UsersService()

    def format_response(self, user: User, token: str, status_code: int = HTTP_200_OK):
        schema = UserSchema()

        user_data = schema.dump(user)

        response = JSONResponse(
            {"success": True, "result": user_data, "token": token},
            status_code=status_code,
        )
        response.set_cookie(
            AUTH_COOKIE_NAME,
            token,
            expires=settings.AUTH_EXPIRES,
            path="/api",
            domain=settings.APP_DOMAIN,
            secure=not settings.DEBUG,
            httponly=True,
        )

        return response


class LoginController(BaseAuthController):
    async def post(self, request: Request):
        schema = UserSchema()

        try:
            loaded_user: User = schema.load(await request.json())

            user = await self.users_service.get_by_email(loaded_user.email)

            token = await self.auth_service.login(user, loaded_user.password)

            return self.format_response(user, token)
        except EntityDoesNotExistError:
            raise AuthError("Wrong email or password")


class RegisterController(BaseAuthController):
    async def post(self, request: Request):
        schema = UserSchema()

        user = schema.load(await request.json())

        try:
            await self.users_service.get_by_email(user.email)
            raise ValidationError("User already exists")
        except EntityDoesNotExistError:
            pass

        await self.users_service.create(user)

        token = await self.auth_service.register(user)

        return self.format_response(user, token, HTTP_201_CREATED)
