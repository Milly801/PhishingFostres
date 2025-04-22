from fastapi import APIRouter
from server.repositories.emailscenario_repo import EmailScenarioRepo

router = APIRouter(
    prefix="/email_s",
    tags=["E_Scenarios"]
)
