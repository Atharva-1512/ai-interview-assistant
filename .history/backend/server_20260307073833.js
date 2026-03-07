const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend server running" });
});

app.get("/question", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/generate-question");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "AI service error" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});