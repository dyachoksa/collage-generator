# Collage Generator Project

## Structure

-   `backend` - Python REST backend
-   `frontend` - React/TypeScript Web frontend

## Development

### Backend

Start development server:

```bash
cd backend
uvicorn --port 5000 --reload collages:app
```

Application uses [`alembic`](https://alembic.sqlalchemy.org/en/latest/) tool
to work with database migrations. Although it's possible to use different
database engines the code itself heavily depends on PostgreSQL and its
features, such as arrays and enums.

```bash
cd backend
source .venv/bin/activate

# create migration
alembic revision -m <message> --autogenerate

# migrate
alembic upgrade head
```
