from fastapi import APIRouter
from repositories.email_scenario.EmailScenarioRepo import get_randomize

router = APIRouter(
    prefix="/email_s",
    tags=["E_Scenarios"]
)
