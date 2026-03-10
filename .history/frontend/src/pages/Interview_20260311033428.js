import { useState } from "react";
import { getQuestion, evaluateAnswer } from "../services/api";

function Interview() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [resumeQuestion, setResumeQuestion] = useState("");

  const fetchQuestion = async () => {
    const res = await getQuestion();
    setQuestion(res.data.question);
  };

  const submitAnswer = async () => {
  const res = await evaluateAnswer(answer);
  setFeedback(res.data.feedback);
  setScore(res.data.score);
};
{score !== null && (
  <h4>Score: {score}/10</h4>
)}

  return (
    <div>

      <h2>Interview Assistant</h2>

      <button onClick={fetchQuestion}>
        Get Interview Question
      </button>

      {question && (
        <div style={{ marginTop: "20px" }}>
          <h3>Question:</h3>
          <p>{question}</p>

          <textarea
            rows="4"
            cols="50"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <br />

          <button onClick={submitAnswer}>
            Submit Answer
          </button>
        </div>
      )}

      {feedback && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}

    </div>
  );
}

export default Interview;


const uploadResume = async (event) => {
  const file = event.target.files[0];

  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch("http://localhost:5000/upload-resume", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  setResumeQuestion(data.question);
};