from starlette.routing import Mount
from starlette.staticfiles import StaticFiles

from collages import settings

from .controllers import api

routes = [
    Mount(
        "/media/collages",
        app=StaticFiles(directory=settings.COLLAGES_STORAGE_DIR),
        name="static:collages",
    ),
    Mount("/api", routes=api.routes, name="api"),
]
