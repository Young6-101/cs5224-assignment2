from fastapi import FastAPI

app = FastAPI(title="Twitter Statistics API")

@app.get("/")
async def root():
    return {"message": "Twitter Statistics API"}

@app.get("/stats")
async def get_stats(users: str):
    user_ids = users.split(',')
    results = []
    for uid in user_ids:
        results.append({
            "user_id": uid,
            "followers": 123,
            "followees": 456
        })
    return results