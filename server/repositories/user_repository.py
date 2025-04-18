from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from server.models.db_config import ph_session
from server.models.user_model import User
from typing import List,Optional
from datetime import datetime

app = FastAPI()
class UserCreateRequest(BaseModel):
    user_name: str
    email: EmailStr
    password_hashed: str
class UserResponse(BaseModel):
    id: int
    user_name: str
    email: EmailStr
    created_at: datetime  
    updated_at: datetime
    class Config:
        orm_mode = True

@app.post("/users/", response_model=UserResponse)
def create_user(user_request: UserCreateRequest):
    session: Session = ph_session
    try:
        existing_user = session.query(User).filter_by(email=user_request.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="User with this email already exists")

        # Create a new user
        new_user = User(
            user_name=user_request.user_name,
            email=user_request.email,
            password_hashed=user_request.password_hashed,
            updated_at=datetime.utcnow()
        )
        session.add(new_user)
        session.commit()
        session.refresh(new_user) 
        return new_user
    finally:
        session.close()

@app.get("/users/", response_model=List[UserResponse])
def get_users():#getting all users
    session: Session = ph_session
    try:
        users = session.query(User).all()
        return users
    finally:
        session.close()

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    session: Session = ph_session
    try:
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    finally:
        session.close()

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    session: Session = ph_session
    try:
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        session.delete(user)
        session.commit()
        return {"message": "User deleted successfully"}
    finally:
        session.close()

@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_request: UserCreateRequest):
    session: Session = ph_session
    try:
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            print(f"Failed to update: User with ID {user_id} not found.")  # Console message for failure
            raise HTTPException(status_code=404, detail="User not found")

        user.user_name = user_request.user_name
        user.email = user_request.email
        user.password_hashed = user_request.password_hashed
        user.updated_at = datetime.utcnow()

        session.commit()
        session.refresh(user)

        print(f"User with ID {user_id} has been updated successfully.")
        return user
    except Exception as e:
        print(f"An error occurred while updating user with ID {user_id}: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")
    finally:
        session.close()


@app.get("/users/email/{email}", response_model=UserResponse)
def get_user_by_email(email: str):
    session: Session = ph_session
    try:

        user = session.query(User).filter_by(email=email).first()
        if not user:
            print(f"User with email {email} not found.") 
            raise HTTPException(status_code=404, detail="User not found")
        
        print(f"User with email {email} retrieved successfully.") 
        return user
    except Exception as e:
        print(f"An error occurred while retrieving user with email {email}: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")
    finally:
        session.close()