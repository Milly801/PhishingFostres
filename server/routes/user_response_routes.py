from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from server.services.user_response_Algorithm import save_user_response

router = APIRouter()


class UserResponseRequest(BaseModel):
    email_scenario_id: str
    phishing_status: str
    user_id: str
    user_response: str
    result: str

@router.post("/user-response")
async def user_response(request: UserResponseRequest):
    """Save user response to database."""
    try:
        response = save_user_response(
            email_scenario_id=request.email_scenario_id,
            phishing_status=request.phishing_status,
            user_id=request.user_id,
            user_response=request.user_response,
            result=request.result
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))