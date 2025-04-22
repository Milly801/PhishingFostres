from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, Header, Request
from fastapi.security import HTTPAuthorizationCredentials
from server.repositories.user_repository import UserRepository
from server.services.auth_service import verify_jwt
from server.models.user_model import User
import requests

router = APIRouter(
    prefix = "/users",
    tags= ["Users"]
)

@router.post("/auth/signup")
async def signup(request: Request, authorization:str = Header(...)):
    try:
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="No auth header")
        token = authorization.split(" ")[1]
        credentials = HTTPAuthorizationCredentials(
            scheme="Bearer", credentials=token)
        decoded_token = verify_jwt(credentials)
        body = await request.json()

        auth0_id = decoded_token["sub"]
        #email = decoded_token["email"]

        user_data = {"email":body["email"], "auth0_id":auth0_id, "user_name":body["user_name"]}
        user_repository = UserRepository()
        new_user = await user_repository.create_user(user_data)
        return {
            "id": new_user.id,
            "auth0_id": new_user.auth0_id,
            "email": new_user.email
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
