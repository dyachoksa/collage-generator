import datetime

from collages.data.entities import User
from collages.data.tables import Users
from collages.extensions import db

from .security import PasswordService
from ..errors import EntityDoesNotExistError, EntityExistsError


class UsersService:
    def __init__(self, password_service=None):
        self.password_service = password_service or PasswordService()

    async def get_by_email(self, email: str) -> User:
        query = Users.select().where(Users.c.email == email)

        return await self._select(query)

    async def get_by_id(self, user_id: int) -> User:
        query = Users.select().where(Users.c.id == user_id)

        return await self._select(query)

    async def create(self, user: User):
        try:
            _ = await self.get_by_email(user.email)
            raise EntityExistsError("User already exists")
        except EntityDoesNotExistError:
            pass

        user.password = await self.password_service.generate_pass_hash(user.password)
        user.created_at = datetime.datetime.utcnow()
        user.updated_at = datetime.datetime.utcnow()

        query = Users.insert().values(
            email=user.email,
            password=user.password,
            is_active=user.is_active,
            first_name=user.first_name,
            last_name=user.last_name,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )
        user_id = await db.execute(query)
        user.id = user_id

    async def update(self, user: User):
        user.updated_at = datetime.datetime.utcnow()

        query = (
            Users.update()
            .where(Users.c.id == user.id)
            .values(
                email=user.email,
                password=user.password,
                is_active=user.is_active,
                first_name=user.first_name,
                last_name=user.last_name,
                last_logged_at=user.last_logged_at,
                updated_at=user.updated_at,
            )
        )

        await db.execute(query)

    async def _select(self, query):
        user = await db.fetch_one(query)
        if user is None:
            raise EntityDoesNotExistError("User does not exist")

        return User(**dict(user))
