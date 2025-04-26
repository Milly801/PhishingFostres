from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, Header, Request
from fastapi.security import HTTPAuthorizationCredentials
from server.repositories.user_repository import UserRepository
from server.services.auth_service import verify_jwt, get_user_info
from server.models.user_model import User
import requests

router = APIRouter(
    prefix = "/users",
    tags= ["Users"]
)

@router.post("/auth/signup")
async def signup(authorization:str = Header(...)):
    try:
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="No auth header")
        token = authorization.split(" ")[1]
        credentials = HTTPAuthorizationCredentials(
            scheme="Bearer", credentials=token)
        decoded_token = verify_jwt(credentials)

        user_info = await get_user_info(token)

        print("Decoded token contents:", decoded_token)

        auth0_id = decoded_token["sub"]
        email = user_info["email"]

        user_data = {"email": email, "auth0_id":auth0_id}
        user_repository = UserRepository()
        new_user = await user_repository.create_user(user_data)
        return {
            "id": new_user.id,
            "auth0_id": new_user.auth0_id,
            "email": new_user.email
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/auth/login")
async def login(authorization:str = Header(...)):
    try:
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="No auth header")
        token = authorization.split(" ")[1]
        credentials = HTTPAuthorizationCredentials(
            scheme="Bearer", credentials=token)
        decoded_token = verify_jwt(credentials)
        user_info = await get_user_info(token)
        email = user_info["email"]
        if not email:
            raise HTTPException(status_code=401, detail="No email provided")

        user_repository = UserRepository()
        existing_user = await user_repository.get_user_by_email(email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        return {
            "message": "Login successful!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
