from fastapi import FastAPI
from . import user_routes, email_scenario_routes

app = FastAPI()

app.include_router(user_routes.router)
app.include_router(email_scenario_routes.router)

@app.get("/")
def fortress_home():
    return {"message": "Connected to home of phishfortress"}