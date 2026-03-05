from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI engine running"}

@app.get("/health")
def health():
    return {"status": "AI service active"}