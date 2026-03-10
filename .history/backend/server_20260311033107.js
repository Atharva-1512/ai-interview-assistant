const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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


app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const response = await axios.post(
      "http://127.0.0.1:8000/generate-resume-question",
      { filePath }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Resume processing error" });
  }
});