from fastapi import APIRouter
from repositories.user_repository import create_user

router = APIRouter(
    prefix = "/users",
    tags= ["Users"]
)