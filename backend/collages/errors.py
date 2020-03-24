"""Application errors and exceptions"""


class ApplicationError(Exception):
    pass


class AuthError(ApplicationError):
    pass


class EntityDoesNotExistError(ApplicationError):
    pass


class EntityExistsError(ApplicationError):
    pass
