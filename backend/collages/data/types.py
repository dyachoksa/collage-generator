from enum import auto, unique, Enum


class AutoName(Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name


@unique
class CollageStatus(AutoName):
    NEW = auto()
    IS_PROCESSING = auto()
    GENERATED = auto()
    FAILED = auto()
