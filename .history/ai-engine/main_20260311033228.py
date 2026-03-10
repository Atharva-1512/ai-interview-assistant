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
    
@app.post("/evaluate-answer")
def evaluate_answer(data: dict):
    answer = data.get("answer", "")

    score = 0
    feedback = ""

    if len(answer) > 20:
        score += 3
    else:
        feedback += "Your answer is too short. Try explaining more. "

    keywords = ["api", "request", "response", "data", "server"]

    keyword_count = sum(word in answer.lower() for word in keywords)

    score += keyword_count

    if keyword_count > 2:
        feedback += "Good use of technical terms. "
    else:
        feedback += "Try including more technical keywords. "

    if score > 6:
        feedback += "Overall this is a strong answer."
    else:
        feedback += "Your answer needs more depth."

    return {
        "feedback": feedback,
        "score": score
    } 