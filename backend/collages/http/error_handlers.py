from marshmallow import ValidationError
from starlette.exceptions import HTTPException
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_500_INTERNAL_SERVER_ERROR,
)

from collages.errors import EntityDoesNotExistError


async def http_exception(request: Request, exc: HTTPException):
    content = {"message": exc.detail, "success": False, "status": exc.status_code}
    return JSONResponse(content, status_code=exc.status_code)


async def not_found(request: Request, exc: EntityDoesNotExistError):
    content = {"message": str(exc), "success": False, "status": HTTP_404_NOT_FOUND}
    return JSONResponse(content, status_code=HTTP_404_NOT_FOUND)


async def validation_error(request: Request, exc: ValidationError):
    content = {
        "message": "Validation error",
        "success": False,
        "status": HTTP_400_BAD_REQUEST,
        "errors": exc.messages,
    }
    return JSONResponse(content, status_code=HTTP_400_BAD_REQUEST)


async def internal_error(request: Request, exc: Exception):
    content = {
        "message": "Internal error",
        "success": False,
        "status": HTTP_500_INTERNAL_SERVER_ERROR,
        "error": str(exc),
    }
    return JSONResponse(content, status_code=HTTP_500_INTERNAL_SERVER_ERROR)


exception_handlers = {
    HTTPException: http_exception,
    EntityDoesNotExistError: not_found,
    ValidationError: validation_error,
    Exception: internal_error,
}
