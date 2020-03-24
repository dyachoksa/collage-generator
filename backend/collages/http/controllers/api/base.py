import typing
from starlette.requests import Request
from starlette.responses import Response, JSONResponse
from starlette.status import HTTP_200_OK

from collages.data.entities import Collage
from collages.http.schemas import CollageSchema


def format_collage_response(
    request: Request,
    collage: typing.Union[Collage, typing.List[Collage]],
    status_code: int = HTTP_200_OK,
    many: bool = False,
) -> Response:
    schema = CollageSchema(context={"request": request})

    collage_data = schema.dump(collage, many=many)

    return JSONResponse(
        {"success": True, "result": collage_data}, status_code=status_code
    )
