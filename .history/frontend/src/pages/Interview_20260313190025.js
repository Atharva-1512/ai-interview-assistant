const [questions, setQuestions] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [scores, setScores] = useState([]);
const [sessionComplete, setSessionComplete] = useState(false);



import { useState } from "react";
import { getQuestion, evaluateAnswer } from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface-2: #1a1a24;
    --border: rgba(255,255,255,0.07);
    --accent: #6c63ff;
    --accent-glow: rgba(108, 99, 255, 0.25);
    --accent-2: #ff6b6b;
    --text-primary: #f0eff8;
    --text-secondary: #8887a0;
    --text-muted: #4a4960;
    --success: #4ade80;
    --success-bg: rgba(74, 222, 128, 0.08);
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .iv-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font-body);
    color: var(--text-primary);
    padding: 48px 24px 80px;
    position: relative;
    overflow-x: hidden;
  }

  .iv-root::before {
    content: '';
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .iv-container {
    max-width: 680px;
    margin: 0 auto;
  }

  /* Header */
  .iv-header {
    margin-bottom: 48px;
    text-align: center;
  }

  .iv-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(108,99,255,0.12);
    border: 1px solid rgba(108,99,255,0.3);
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
  }

  .iv-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .iv-title {
    font-family: var(--font-display);
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    background: linear-gradient(135deg, #f0eff8 30%, #8887a0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
  }

  .iv-subtitle {
    font-size: 15px;
    color: var(--text-secondary);
    font-weight: 300;
    line-height: 1.6;
  }

  /* Card */
  .iv-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .iv-card:hover {
    border-color: rgba(255,255,255,0.12);
  }

  .iv-card-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .iv-card-label span {
    width: 16px;
    height: 1px;
    background: var(--text-muted);
    display: inline-block;
  }

  /* Upload Zone */
  .iv-upload-zone {
    border: 1.5px dashed rgba(108,99,255,0.3);
    border-radius: 14px;
    padding: 28px;
    text-align: center;
    background: rgba(108,99,255,0.04);
    transition: all 0.2s;
    cursor: pointer;
    position: relative;
  }

  .iv-upload-zone:hover {
    border-color: rgba(108,99,255,0.6);
    background: rgba(108,99,255,0.08);
  }

  .iv-upload-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    font-size: 18px;
  }

  .iv-upload-text {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 400;
  }

  .iv-upload-text strong {
    color: var(--accent);
    font-weight: 500;
  }

  .iv-upload-hint {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .iv-file-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  /* Resume Question */
  .iv-resume-result {
    margin-top: 16px;
    padding: 16px;
    background: var(--success-bg);
    border: 1px solid rgba(74,222,128,0.15);
    border-radius: 12px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .iv-resume-result-icon {
    font-size: 16px;
    margin-top: 1px;
    flex-shrink: 0;
  }

  .iv-resume-result p {
    font-size: 14px;
    color: #b0f4c8;
    line-height: 1.6;
  }

  /* Divider */
  .iv-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 8px 0;
    color: var(--text-muted);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .iv-divider::before, .iv-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* Button */
  .iv-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 24px;
    border-radius: 12px;
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    width: 100%;
  }

  .iv-btn-primary {
    background: var(--accent);
    color: white;
    box-shadow: 0 4px 20px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  .iv-btn-primary:hover {
    background: #7c74ff;
    transform: translateY(-1px);
    box-shadow: 0 8px 30px var(--accent-glow);
  }

  .iv-btn-primary:active {
    transform: translateY(0);
  }

  .iv-btn-secondary {
    background: var(--surface-2);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }

  .iv-btn-secondary:hover {
    background: #22222e;
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-1px);
  }

  /* Question Display */
  .iv-question-box {
    background: var(--surface-2);
    border-radius: 12px;
    padding: 18px 20px;
    margin-bottom: 16px;
    border-left: 3px solid var(--accent);
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-primary);
  }

  /* Textarea */
  .iv-textarea {
    width: 100%;
    background: var(--surface-2);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 300;
    color: var(--text-primary);
    resize: vertical;
    min-height: 120px;
    outline: none;
    transition: border-color 0.2s;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .iv-textarea::placeholder { color: var(--text-muted); }

  .iv-textarea:focus {
    border-color: rgba(108,99,255,0.5);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  /* Feedback */
  .iv-feedback-card {
    background: linear-gradient(135deg, #13121e, #0e0e18);
    border: 1px solid rgba(108,99,255,0.2);
    border-radius: 20px;
    padding: 28px;
    position: relative;
    overflow: hidden;
  }

  .iv-feedback-card::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(108,99,255,0.08), transparent 70%);
    pointer-events: none;
  }

  .iv-feedback-text {
    font-size: 14.5px;
    line-height: 1.75;
    color: #cccad8;
    margin-bottom: 20px;
  }

  .iv-score-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .iv-score-label {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .iv-score-bar-track {
    flex: 1;
    height: 6px;
    background: var(--surface-2);
    border-radius: 100px;
    overflow: hidden;
  }

  .iv-score-bar-fill {
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, var(--accent), #a78bff);
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .iv-score-value {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 800;
    color: var(--accent);
    white-space: nowrap;
    min-width: 44px;
    text-align: right;
  }
`;

function Interview() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [resumeQuestion, setResumeQuestion] = useState("");

  const fetchQuestion = async () => {
    try {
      const res = await getQuestion();
      setQuestion(res.data.question);
    } catch (error) {
      console.error(error);
    }
  };

  const submitAnswer = async () => {
    try {
      const res = await evaluateAnswer(answer);
      setFeedback(res.data.feedback);
      setScore(res.data.score);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadResume = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("resume", file);
    const res = await fetch("http://localhost:5000/upload-resume", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResumeQuestion(data.question);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="iv-root">
        <div className="iv-container">

          {/* Header */}
          <div className="iv-header">
            <div className="iv-badge">
              <span className="iv-badge-dot" />
              AI Powered
            </div>
            <h1 className="iv-title">Interview Assistant</h1>
            <p className="iv-subtitle">
              Practice with AI-generated questions and get instant, detailed feedback on your answers.
            </p>
          </div>

          {/* Resume Upload */}
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
              <p className="iv-upload-hint">PDF, DOCX — Get personalized questions</p>
            </div>

            {resumeQuestion && (
              <div className="iv-resume-result">
                <span className="iv-resume-result-icon">✦</span>
                <p>{resumeQuestion}</p>
              </div>
            )}
          </div>

          <div className="iv-divider">or</div>

          {/* Generate Question */}
          <div className="iv-card">
            <div className="iv-card-label">
              <span />
              Question
            </div>
            <button className="iv-btn iv-btn-secondary" onClick={fetchQuestion}>
              ⚡ Generate Interview Question
            </button>

            {question && (
              <div style={{ marginTop: "20px" }}>
                <div className="iv-question-box">{question}</div>
                <textarea
                  className="iv-textarea"
                  rows="5"
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button className="iv-btn iv-btn-primary" onClick={submitAnswer}>
                  Submit Answer →
                </button>
              </div>
            )}
          </div>

          {/* Feedback */}
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

        </div>
      </div>
    </>
  );
}

export default Interview; 