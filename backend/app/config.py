import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # AWS S3 
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_REGION = os.getenv("AWS_REGION", "ap-southeast-1")
    S3_BUCKET = os.getenv("S3_BUCKET")
    S3_RESULTS_KEY = os.getenv("S3_RESULTS_KEY", "results/user_stats/")