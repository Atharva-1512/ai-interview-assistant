const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "AI Interview Assistant Backend running" });
});

// Question route
app.get("/question", async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/generate-question");

    res.json({
      source: "AI Engine",
      question: response.data.question
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI service error" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});