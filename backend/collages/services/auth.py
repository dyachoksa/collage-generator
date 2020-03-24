import datetime as dt

import jwt
from starlette.concurrency import run_in_threadpool

from collages import settings
from collages.constants import AUTH_ALGORITHM
from collages.data.entities import User
from collages.errors import AuthError

from .security import PasswordService


class AuthService:
    def __init__(self, secret_key=None):
        self.secret_key = secret_key or str(settings.SECRET_KEY)
        self.expiration_delta = dt.timedelta(seconds=settings.AUTH_EXPIRES)
        self.password_service = PasswordService()

    async def login(self, user: User, password: str) -> str:
        """Validates password and generates JWT"""
        ok = await self.password_service.verify_pass_hash(password, user.password)
        if not ok:
            raise AuthError("Wrong email or password")

        return await run_in_threadpool(self.generate_token, user)

    async def register(self, user: User):
        """Generates JWT (part of a registration process)"""
        return await run_in_threadpool(self.generate_token, user)

    def get_user_id_from_token(self, token: str) -> int:
        """Decodes and loads user_id from JWT payload"""
        payload = jwt.decode(token, self.secret_key, algorithms=AUTH_ALGORITHM)
        return int(payload["sub"])

    def generate_token(self, user: User) -> str:
        """Generates JWT for selected user"""
        expiration = dt.datetime.utcnow() + self.expiration_delta

        payload = {"sub": user.identity, "exp": expiration}

        token = jwt.encode(payload, self.secret_key, algorithm=AUTH_ALGORITHM)

        return token.decode("utf-8")
