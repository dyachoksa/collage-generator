import datetime
import logging
import time
from dataclasses import asdict
from typing import List

from collages.data.entities import Collage, User
from collages.data.tables import Collages
from collages.data.types import CollageStatus
from collages.errors import EntityDoesNotExistError
from collages.extensions import db
from collages.generators.random_generator import RandomGenerator


class CollagesService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)

    async def find_by_user_id(self, user_id: int) -> List[Collage]:
        query = Collages.select().where(Collages.c.user_id == user_id)

        result = await db.fetch_all(query)

        return [Collage(**dict(row)) for row in result]

    async def get_by_id(self, collage_id: int) -> Collage:
        query = Collages.select().where(Collages.c.id == collage_id)

        collage = await db.fetch_one(query)
        if collage is None:
            raise EntityDoesNotExistError("Collage does not exist")

        return Collage(**dict(collage))

    async def create(self, user: User, collage: Collage):
        collage.user_id = user.id
        collage.status = CollageStatus.NEW
        collage.created_at = datetime.datetime.utcnow()
        collage.updated_at = datetime.datetime.utcnow()

        values = asdict(collage)
        del values["id"]

        query = Collages.insert().values(**values)

        collage_id = await db.execute(query)
        collage.id = collage_id

    async def update(self, collage: Collage):
        collage.updated_at = datetime.datetime.utcnow()

        values = asdict(collage)
        del values["id"]
        del values["created_at"]

        query = Collages.update().where(Collages.c.id == collage.id).values(values)

        await db.execute(query)

    async def remove(self, collage: Collage):
        query = Collages.delete().where(Collages.c.id == collage.id)

        await db.execute(query)

    async def generate(self, collage: Collage):
        self.logger.debug("Started generation of collage ID %d", collage.id)
        time_start = time.perf_counter()

        generator = RandomGenerator(collage)

        collage.image = await generator.generate()

        time_end = time.perf_counter()
        self.logger.info(
            "Collage ID#%d generated in %.6f sec", collage.id, (time_end - time_start)
        )

        collage.updated_at = datetime.datetime.utcnow()
        collage.status = CollageStatus.GENERATED

        query = (
            Collages.update()
            .where(Collages.c.id == collage.id)
            .values(
                image=collage.image,
                status=collage.status,
                updated_at=collage.updated_at,
            )
        )
        await db.execute(query)
