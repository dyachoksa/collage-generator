"""Data entities"""
import datetime
from dataclasses import dataclass, field
from typing import Optional, List

from starlette.authentication import BaseUser

from .types import CollageStatus


@dataclass
class User(BaseUser):
    """Application user entity"""

    id: int = field(default=None)
    email: str = field(default=None)
    password: Optional[str] = field(repr=False, default="")
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: bool = True
    last_logged_at: Optional[datetime.datetime] = field(repr=False, default=None)
    created_at: Optional[datetime.datetime] = field(repr=False, default=None)
    updated_at: Optional[datetime.datetime] = field(repr=False, default=None)

    def __str__(self):
        return self.email

    @property
    def is_authenticated(self) -> bool:
        return True

    @property
    def display_name(self) -> str:
        return str(self)

    @property
    def identity(self) -> str:
        return str(self.id)


@dataclass
class Collage:
    """Collage entity"""

    id: int = field(default=None)
    user_id: int = field(default=None)
    title: Optional[str] = None
    description: Optional[str] = field(default=None, repr=False)
    status: CollageStatus = CollageStatus.NEW
    image: Optional[str] = field(default=None, repr=False)
    source_images: List[str] = field(default_factory=list, repr=False)
    created_at: Optional[datetime.datetime] = field(repr=False, default=None)
    updated_at: Optional[datetime.datetime] = field(repr=False, default=None)

    def __str__(self):
        return self.title if self.title else "No name"


@dataclass
class CollageImage:
    name: Optional[str] = None
    aspect: Optional[float] = None
    width: Optional[int] = None
    height: Optional[int] = None


@dataclass
class CollageNode:
    image: Optional[CollageImage] = None
    left: Optional["CollageNode"] = None
    right: Optional["CollageNode"] = None
    is_leaf: bool = False
    is_vertical_split: bool = True
