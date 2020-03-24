"""HTTP-related extension fields"""
import typing
from marshmallow.fields import Field


class EnumField(Field):
    def __init__(self, enum, *args, **kwargs):
        self.enum = enum

        super().__init__(*args, **kwargs)

    def _serialize(self, value: typing.Any, attr: str, obj: typing.Any, **kwargs):
        return None if value is None else value.name

    def _deserialize(
        self,
        value: typing.Any,
        attr: typing.Optional[str],
        data: typing.Optional[typing.Mapping[str, typing.Any]],
        **kwargs,
    ):
        if value is None:
            return None

        if not isinstance(value, str):
            self.fail("type")

        try:
            return getattr(self.enum, value)
        except AttributeError:
            self.fail("validator_failed")
