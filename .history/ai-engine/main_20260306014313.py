from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "AI Interview Assistant API Running 🚀"}

@app.get("/question")
def get_question():
    return {"question": "Tell me about yourself."}