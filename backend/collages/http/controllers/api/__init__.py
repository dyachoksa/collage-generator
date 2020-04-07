from starlette.routing import Route

from .auth import LoginController, RegisterController, LogoutController
from .collages import CollageController, CollagesController, CollageGeneratorController
from .images import ImagesController, ImageController
from .users import UserController

routes = [
    Route("/auth/logout", LogoutController, name="logout"),
    Route("/auth/login", LoginController, name="login"),
    Route("/auth/register", RegisterController, name="register"),
    Route("/users/me", UserController),
    Route("/users/{user_id:int}", UserController, name="user"),
    Route("/collages", CollagesController, name="collages"),
    Route("/collages/{collage_id:int}", CollageController, name="collage"),
    Route(
        "/collages/{collage_id:int}/create",
        CollageGeneratorController,
        name="generator",
    ),
    Route("/images", ImagesController, name="images"),
    Route("/images/{image:path}", ImageController, name="image"),
]
