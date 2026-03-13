import { useState } from "react";
import { getQuestion, evaluateAnswer } from "../services/api";

/* ---------- STYLES (UNCHANGED) ---------- */
const styles = `

/* (your entire CSS stays exactly the same here) */

`;

/* ---------- COMPONENT ---------- */

function Interview() {

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [resumeQuestion, setResumeQuestion] = useState("");

  /* ---------- Generate 3 Questions ---------- */

  const fetchQuestion = async () => {

    const newQuestions = [];

    for (let i = 0; i < 3; i++) {
      const res = await getQuestion();
      newQuestions.push(res.data.question);
    }

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScores([]);
    setSessionComplete(false);
  };

  /* ---------- Submit Answer ---------- */

  const submitAnswer = async () => {

    const res = await evaluateAnswer(answer);

    setFeedback(res.data.feedback);
    setScore(res.data.score);

    const newScores = [...scores, res.data.score];
    setScores(newScores);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer("");
    } else {
      setSessionComplete(true);
    }
  };

  /* ---------- Upload Resume ---------- */

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

  /* ---------- UI ---------- */

  return (
    <>
      <style>{styles}</style>

      <div className="iv-root">
        <div className="iv-container">

          {/* HEADER */}
          <div className="iv-header">
            <div className="iv-badge">
              <span className="iv-badge-dot" />
              AI Powered
            </div>

            <h1 className="iv-title">Interview Assistant</h1>

            <p className="iv-subtitle">
              Practice with AI-generated questions and get instant feedback.
            </p>
          </div>

          {/* RESUME UPLOAD */}
          <div className="iv-card">

            <div className="iv-card-label">
              <span />
              Resume
            </div>

            <div className="iv-upload-zone">
              <input
                type="file"
                className="iv-file-input"
                onChange={uploadResume}
              />

              <div className="iv-upload-icon">📄</div>

              <p className="iv-upload-text">
                <strong>Click to upload</strong> your resume
              </p>

              <p className="iv-upload-hint">
                PDF, DOCX — Get personalized questions
              </p>
            </div>

            {resumeQuestion && (
              <div className="iv-resume-result">
                <span className="iv-resume-result-icon">✦</span>
                <p>{resumeQuestion}</p>
              </div>
            )}

          </div>

          <div className="iv-divider">or</div>

          {/* GENERATE QUESTIONS */}
          <div className="iv-card">

            <div className="iv-card-label">
              <span />
              Question
            </div>

            <button
              className="iv-btn iv-btn-secondary"
              onClick={fetchQuestion}
            >
              ⚡ Generate Interview Question
            </button>

            {questions.length > 0 && !sessionComplete && (

              <div style={{ marginTop: "20px" }}>

                <div className="iv-question-box">
                  {questions[currentIndex]}
                </div>

                <textarea
                  className="iv-textarea"
                  rows="5"
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />

                <button
                  className="iv-btn iv-btn-primary"
                  onClick={submitAnswer}
                >
                  Submit Answer →
                </button>

              </div>

            )}

          </div>

          {/* FEEDBACK */}
          {feedback && (

            <div className="iv-feedback-card">

              <div className="iv-card-label" style={{ marginBottom: "14px" }}>
                <span style={{ background: "#4a4960" }} />
                AI Feedback
              </div>

              <p className="iv-feedback-text">{feedback}</p>

              {score !== null && (

                <div className="iv-score-row">

                  <span className="iv-score-label">Score</span>

                  <div className="iv-score-bar-track">
                    <div
                      className="iv-score-bar-fill"
                      style={{ width: `${(score / 10) * 100}%` }}
                    />
                  </div>

                  <span className="iv-score-value">{score}/10</span>

                </div>

              )}

            </div>

          )}

          {/* FINAL RESULT */}
          {sessionComplete && (

            <div className="iv-card">

              <h2>Interview Completed</h2>

              <p>
                Final Score:
                {" "}
                {scores.reduce((a, b) => a + b, 0)}
                {" / "}
                {scores.length * 10}
              </p>

            </div>

          )}

        </div>
      </div>
    </>
  );
}

export default Interview;