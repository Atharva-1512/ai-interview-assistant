from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI engine running"}

@app.get("/health")
def health():
    return {"status": "AI service active"}


@app.get("/generate-question")
def generate_question():
    question = "Explain the difference between REST API and GraphQL."
    return {"question": question}    