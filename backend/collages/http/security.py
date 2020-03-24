import typing

import jwt
from starlette.authentication import (
    AuthCredentials,
    AuthenticationBackend,
    AuthenticationError,
    BaseUser,
)
from starlette.requests import Request

from collages.constants import AUTH_HEADER_SCHEME, AUTH_COOKIE_NAME
from collages.errors import EntityDoesNotExistError
from collages.services import UsersService, AuthService


class AppAuthenticationBackend(AuthenticationBackend):
    def __init__(self):
        self.auth_service = AuthService()
        self.users_service = UsersService()

    async def authenticate(
        self, request: Request
    ) -> typing.Optional[typing.Tuple["AuthCredentials", "BaseUser"]]:
        header_token = AppAuthenticationBackend.get_token_from_headers(request)
        cookie_token = AppAuthenticationBackend.get_token_from_cookies(request)

        if header_token is None and cookie_token is None:
            return

        token = header_token if header_token is not None else cookie_token

        try:
            user_id = self.auth_service.get_user_id_from_token(token)

            user = await self.users_service.get_by_id(user_id)

            return AuthCredentials(["user"]), user
        except (jwt.ExpiredSignatureError, jwt.DecodeError):
            raise AuthenticationError("Invalid authorization token")
        except (KeyError, EntityDoesNotExistError):
            raise AuthenticationError("Bad credentials")

    @staticmethod
    def get_token_from_headers(request: Request) -> typing.Optional[str]:
        if "Authorization" not in request.headers:
            return None

        try:
            schema, token = request.headers["Authorization"].split()

            if schema.lower() != AUTH_HEADER_SCHEME:
                raise ValueError()

            return token
        except ValueError:
            return None

    @staticmethod
    def get_token_from_cookies(request: Request) -> typing.Optional[str]:
        if AUTH_COOKIE_NAME not in request.cookies:
            return None

        return request.cookies[AUTH_COOKIE_NAME]
