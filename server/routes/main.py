import logging
from fastapi import FastAPI
from . import user_routes, email_scenario_routes


app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://phish-fostress.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_routes.router)
app.include_router(email_scenario_routes.router)

@app.get("/")
def fortress_home():
    return {"message": "Connected to home of phishfortress"}