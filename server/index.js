const express = require("express");
const app = express();
const path = require('path');
const questions = require("./database/data.json");

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get("/api/data", (req, res) => {
  const now = Math.floor(Date.now() / 1000);
  const timerStart = now + 45 * 60;
  res.json(timerStart);
});

// API endpoint for fetching 10 random questions
app.get("/questions", (req, res) => {
  // Shuffle the question array
  const randomQuestions = getNRandomQuestions(questions, 10);
  res.json(randomQuestions);
});

function getNRandomQuestions(data, n) {
  const shuffledQuestions = data.sort(() => 0.5 - Math.random()); // shuffle the data
  return shuffledQuestions.slice(0, n).map((question) => {
    // Remove the correct answer from the question object
    const { correct, ...questionWithoutCorrect } = question;
    return questionWithoutCorrect;
  });
}

app.post("/check-answers", (req, res) => {
  try {
    const attemptedOptions = req.body;
    let score = 0;

    // Check each attempted option against the correct answer
    attemptedOptions.forEach((attempt) => {
      const question = questions.find((q) => q._id === attempt.id);
      if (question && question.correct === attempt.option) {
        score++;
      }
    });

    // Send the total number of correct answers back to the client
    res.send({ score });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/correct-options", (req, res) => {
  try {
    const identity = req.body;
    let correctOptions = [];
    identity.forEach((front) => {
      const question = questions.find((q) => q._id === front.id);
      correctOptions.push(question.correct);
    });
    res.send(correctOptions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(8000, function () {
  console.log("Server is listening on port 8000");
});