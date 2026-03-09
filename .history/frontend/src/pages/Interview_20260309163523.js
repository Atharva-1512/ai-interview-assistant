import { useState } from "react";
import { getQuestion, evaluateAnswer } from "../services/api";

function Interview() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchQuestion = async () => {
    const res = await getQuestion();
    setQuestion(res.data.question);
  };

  const submitAnswer = async () => {
    const res = await evaluateAnswer(answer);
    setFeedback(res.data.feedback);
  };

  return (
    <div>

      <h2>AI Interview Assistant</h2>

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