import { useState } from "react";
import { getQuestion, evaluateAnswer } from "../services/api";

function Interview() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [resumeQuestion, setResumeQuestion] = useState("");

  // Get interview question
  const fetchQuestion = async () => {
    try {
      const res = await getQuestion();
      setQuestion(res.data.question);
    } catch (error) {
      console.error(error);
    }
  };

  // Submit answer for evaluation
  const submitAnswer = async () => {
    try {
      const res = await evaluateAnswer(answer);
      setFeedback(res.data.feedback);
      setScore(res.data.score);
    } catch (error) {
      console.error(error);
    }
  };

  // Upload resume
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

  return (
    <div style={{ padding: "20px" }}>

      <h2>AI Interview Assistant</h2>

      {/* Resume Upload */}
      <h3>Upload Resume for Personalized Questions</h3>

      <input type="file" onChange={uploadResume} />

      {resumeQuestion && (
        <div style={{ marginTop: "15px" }}>
          <h3>Resume Based Question</h3>
          <p>{resumeQuestion}</p>
        </div>
      )}

      <hr />

      {/* Generate Question */}
      <button onClick={fetchQuestion}>
        Get Interview Question
      </button>

      {question && (
        <div style={{ marginTop: "20px" }}>

          <h3>Interview Question</h3>
          <p>{question}</p>

          <textarea
            rows="4"
            cols="50"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <br /><br />

          <button onClick={submitAnswer}>
            Submit Answer
          </button>

        </div>
      )}

      {feedback && (
        <div style={{ marginTop: "20px" }}>

          <h3>AI Interview Feedback</h3>
          <p>{feedback}</p>

          {score !== null && (
            <h4>Score: {score}/10</h4>
          )}

        </div>
      )}

    </div>
  );
}

export default Interview;