from databases import Database

from . import settings

db = Database(settings.DATABASE_URL)
