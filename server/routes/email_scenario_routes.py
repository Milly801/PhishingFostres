from fastapi import APIRouter, HTTPException
from server.repositories.emailscenario_repo import EmailScenarioRepo

router = APIRouter(
    prefix="/email_s",
    tags=["E_Scenarios"]
)

@router.get("/simulated_emails")
async def get_simulated_emails(count: int = 10):
    try:
        repo = EmailScenarioRepo()
        return repo.get_randomized_emails_by_phishing_stat(count)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
