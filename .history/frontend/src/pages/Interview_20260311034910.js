import { useState } from "react";
import { getQuestion, evaluateAnswer } from "../services/api";

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
      body: formData
    });

    const data = await res.json();
    setResumeQuestion(data.question);
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>AI Interview Assistant</h1>

        {/* Resume Upload */}

        <h3 style={styles.sectionTitle}>Upload Resume for Personalized Questions</h3>

        <input
          type="file"
          onChange={uploadResume}
          style={styles.fileInput}
        />

        {resumeQuestion && (
          <div style={styles.resumeBox}>
            <h3>Resume Based Question</h3>
            <p>{resumeQuestion}</p>
          </div>
        )}

        <hr style={styles.divider} />

        {/* Generate Question */}

        <button style={styles.primaryBtn} onClick={fetchQuestion}>
          Get Interview Question
        </button>

        {question && (
          <div style={styles.questionBox}>

            <h3>Interview Question</h3>
            <p style={styles.questionText}>{question}</p>

            <textarea
              rows="5"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={styles.textarea}
            />

            <button
              style={styles.secondaryBtn}
              onClick={submitAnswer}
            >
              Submit Answer
            </button>

          </div>
        )}

        {feedback && (
          <div style={styles.feedbackBox}>

            <h3>AI Interview Feedback</h3>
            <p>{feedback}</p>

            {score !== null && (
              <h4 style={styles.score}>
                Score: {score}/10
              </h4>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#4f46e5,#9333ea)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "700px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#4f46e5"
  },

  sectionTitle: {
    marginBottom: "10px"
  },

  fileInput: {
    marginBottom: "15px"
  },

  divider: {
    margin: "30px 0"
  },

  primaryBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px"
  },

  secondaryBtn: {
    background: "#9333ea",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "15px"
  },

  questionBox: {
    marginTop: "20px"
  },

  questionText: {
    fontWeight: "500",
    marginBottom: "10px"
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "10px",
    fontSize: "14px"
  },

  feedbackBox: {
    marginTop: "25px",
    padding: "15px",
    background: "#f5f5ff",
    borderRadius: "8px"
  },

  resumeBox: {
    background: "#eef2ff",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "10px"
  },

  score: {
    marginTop: "10px",
    color: "#4f46e5"
  }

};

export default Interview;