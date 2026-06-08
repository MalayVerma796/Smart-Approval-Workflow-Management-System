from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database.db import Base, engine
from app.models.request import Request
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.requests import router as request_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Smart Approval Workflow API",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(auth_router)
app.include_router(request_router)


@app.get("/")
def health_check():
    return {"message": "Smart Approval Workflow API is running"}
