import os

from databases import DatabaseURL
from dotenv import load_dotenv, find_dotenv
from starlette.config import Config
from starlette.datastructures import Secret

load_dotenv(find_dotenv())

_config = Config()

DEBUG = _config("DEBUG", cast=bool, default=False)

DATABASE_URL = _config(
    "DATABASE_URL",
    cast=DatabaseURL,
    default=DatabaseURL("postgresql://localhost/collages"),
)

SECRET_KEY = _config(
    "SECRET_KEY", cast=Secret, default=Secret("SuperSecretKey!ChangeMe!")
)

AUTH_EXPIRES = 7 * 24 * 60 * 60  # expiration time, in seconds

APP_DOMAIN = _config("APP_DOMAIN", default="collages.local")

COLLAGES_STORAGE_DIR = _config(
    "STORAGE_DIR", default=os.path.join("public", "media", "collages")
)
