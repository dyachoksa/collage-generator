"""Auth service and token generator"""
from typing import Coroutine

from passlib.context import CryptContext
from starlette.concurrency import run_in_threadpool


class PasswordService:
    def __init__(self):
        self.hash_lib = CryptContext(schemes=["bcrypt"])

    async def generate_pass_hash(self, password: str) -> str:
        return await run_in_threadpool(self.hash_lib.hash, password)

    async def verify_pass_hash(self, password: str, password_hash: str) -> bool:
        return await run_in_threadpool(self.hash_lib.verify, password, password_hash)
