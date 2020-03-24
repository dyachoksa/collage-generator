# Collage Generator Backend Application
import logging.config

from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette_context import plugins
from starlette_context.middleware import ContextMiddleware

from . import settings
from .extensions import db
from .http import routes
from .http.error_handlers import exception_handlers
from .http.security import AppAuthenticationBackend

logging.config.fileConfig("logging.conf", disable_existing_loggers=False)

middleware = [
    Middleware(
        ContextMiddleware.with_plugins(
            plugins.RequestIdPlugin,  # request id
            plugins.CorrelationIdPlugin,  # correlation id
        )
    ),
    Middleware(AuthenticationMiddleware, backend=AppAuthenticationBackend()),
    Middleware(GZipMiddleware, minimum_size=1024),
]

app = Starlette(
    debug=settings.DEBUG,
    exception_handlers=exception_handlers,
    middleware=middleware,
    routes=routes,
)


# App-level events
@app.on_event("startup")
async def startup():
    await db.connect()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
