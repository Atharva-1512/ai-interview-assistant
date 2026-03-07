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