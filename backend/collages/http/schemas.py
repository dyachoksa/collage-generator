import dataclasses

from marshmallow import Schema, fields, post_load
from starlette.datastructures import URLPath
from starlette.requests import Request

from collages.data.entities import Collage, User
from collages.data.types import CollageStatus

from .fields import EnumField
from ..errors import ApplicationError


class BaseSchema(Schema):
    __model__ = None

    def __init__(self, obj=None, **kwargs):
        super().__init__(**kwargs)

        self.obj = obj

    @post_load
    def map_to(self, in_data, **kwargs):
        if self.__model__ is None:
            return in_data

        if self.obj is None:
            return self.__model__(**in_data)

        obj_dict = dataclasses.asdict(self.obj)
        obj_dict.update(in_data)

        return self.__model__(**obj_dict)


class UserSchema(BaseSchema):
    __model__ = User

    id = fields.Integer(dump_only=True)
    email = fields.Email(required=True)
    password = fields.String(load_only=True)
    first_name = fields.String(default=None)
    last_name = fields.String(default=None)
    is_active = fields.Boolean(dump_only=True)
    last_logged_at = fields.DateTime(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class CollageSchema(BaseSchema):
    __model__ = Collage

    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(dump_only=True)
    title = fields.String(default=None, missing=None, allow_none=True)
    description = fields.String(default=None, missing=None, allow_none=True)
    status = EnumField(CollageStatus, dump_only=True)
    image = fields.Method("get_image", dump_only=True)
    source_images = fields.Method("get_source_images", dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    def get_image(self, obj: Collage):
        if "request" not in self.context:
            raise ApplicationError("Internal error! No request in the context.")

        if obj.image is None:
            return obj.image

        return self.get_absolute_url(obj, obj.image)

    def get_source_images(self, obj: Collage):
        if "request" not in self.context:
            raise ApplicationError("Internal error! No request in the context.")

        if obj.source_images is None:
            return []

        return [self.get_absolute_url(obj, name) for name in obj.source_images]

    def get_absolute_url(self, collage: Collage, image: str):
        request: Request = self.context["request"]

        url = request.url_for(
            "static:collages",
            path="/".join([str(collage.user_id), str(collage.id), image]),
        )

        return {"name": image, "url": url}
