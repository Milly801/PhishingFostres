from fastapi import APIRouter, HTTPException, Query
from server.repositories.emailscenario_repo import EmailScenarioRepo

router = APIRouter(
    prefix="/email_s",
    tags=["E_Scenarios"]
)

@router.get("/simulated_emails")
async def get_simulated_emails(page: int = Query(default=1, ge=1, description="Page number"),
                                per_page: int = Query(default=1, ge=1,le=10, description="Number of emails per page")):
    try:
        repo = EmailScenarioRepo()
        with repo.db.begin():
            emails = repo.get_randomized_emails_by_phishing_stat(page=page, per_page=per_page)
            return emails
    except Exception as e:
        repo.db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        repo.db.close()
