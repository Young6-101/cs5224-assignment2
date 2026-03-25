from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .services.s3_service import S3Service

app = FastAPI(title="Twitter Statistics API")
s3_service = S3Service()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Twitter Statistics API"}

@app.get("/stats")
async def get_stats():
    return s3_service.get_user_stats()