from fastapi import FastAPI
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
def read_root():
    return {"message": "AI engine running"}

@app.get("/health")
def health():
    return {"status": "AI service active"}


@app.get("/generate-question")
def generate_question():

    prompt = "Generate one technical interview question for a software engineering candidate."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    question = response["choices"][0]["message"]["content"]

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


@app.post("/generate-resume-question")
def generate_resume_question(data: dict):

    # Simulated resume-based question
    question = "Your resume mentions React and Node.js. Can you explain how REST APIs work in a full-stack application?"

    return {
        "question": question
    }
