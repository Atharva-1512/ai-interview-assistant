import { useState } from "react";
import { getQuestion } from "../services/api";

function Interview() {

  const [question, setQuestion] = useState("");

  const fetchQuestion = async () => {
    try {
      const res = await getQuestion();
      setQuestion(res.data.question);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div>
      <h2>AI Interview Assistant</h2>

      <button onClick={fetchQuestion}>
        Get AI Interview Question
      </button>

      {question && (
        <div style={{ marginTop: "20px" }}>
          <h3>Question:</h3>
          <p>{question}</p>
        </div>
      )}

    </div>
    
  );
}

export default Interview;