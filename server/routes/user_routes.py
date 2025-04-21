from fastapi import APIRouter, Depends, HTTPException, Header
from repositories.user_repository import create_user
from services.auth_service import verify_jwt
from models.user_model import User

router = APIRouter(
    prefix = "/users",
    tags= ["Users"]
)

@router.post("/signup", response_model=User)
async def signup(user: User):
    existing_user = await create_user(user, check_existing=True)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = await create_user(user)
    if not new_user:
        raise HTTPException(status_code=500, detail="Failed to create user")

    return new_user