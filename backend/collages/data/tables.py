import datetime

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql as pg

from . import metadata
from .types import CollageStatus

Users = sa.Table(
    "users",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True, autoincrement="auto"),
    sa.Column("email", sa.Text, unique=True, nullable=False),
    sa.Column("password", sa.Text, nullable=False),
    sa.Column("first_name", sa.Text, default=None),
    sa.Column("last_name", sa.Text, default=None),
    sa.Column("is_active", sa.Boolean, server_default=sa.true()),
    sa.Column("last_logged_at", sa.DateTime, default=None),
    sa.Column("created_at", sa.DateTime, default=datetime.datetime.utcnow),
    sa.Column(
        "updated_at",
        sa.DateTime,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
    ),
)

Collages = sa.Table(
    "collages",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True, autoincrement="auto"),
    sa.Column(
        "user_id",
        sa.Integer,
        sa.ForeignKey("users.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    ),
    sa.Column("title", sa.Text, default=None),
    sa.Column("description", sa.Text, default=None),
    sa.Column(
        "status",
        pg.ENUM(CollageStatus, name="collage_status"),
        nullable=False,
        server_default=CollageStatus.NEW.name,
    ),
    sa.Column("image", sa.Text, nullable=True, default=None),
    sa.Column(
        "source_images",
        pg.ARRAY(sa.Text),
        nullable=False,
        server_default=sa.text("ARRAY[]::TEXT[]"),
    ),
    sa.Column("created_at", sa.DateTime, default=datetime.datetime.utcnow),
    sa.Column(
        "updated_at",
        sa.DateTime,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
    ),
)
