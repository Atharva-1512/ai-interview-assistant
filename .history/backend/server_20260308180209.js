const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/question", (req, res) => {

    const questions = [
        "Tell me about yourself",
        "What is polymorphism?",
        "Explain REST API",
        "What is a database?",
        "Difference between SQL and NoSQL"
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    res.json({
        question: randomQuestion
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});


app.post("/evaluate", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/evaluate-answer",
      {
        answer: req.body.answer
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI evaluation error" });
  }
});