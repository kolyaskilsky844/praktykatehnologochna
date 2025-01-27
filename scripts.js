const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_app"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/api/questions/:testId", (req, res) => {
  const testId = req.params.testId;
  const query = "SELECT * FROM questions WHERE test_id = ?";
  db.query(query, [testId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/api/results", (req, res) => {
  const { username, testId, score } = req.body;
  const query = "INSERT INTO results (username, test_id, score) VALUES (?, ?, ?)";
  db.query(query, [username, testId, score], (err, result) => {
    if (err) throw err;
    res.send("Result saved!");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
async function fetchQuestions(testId) {
    const response = await fetch(`http://localhost:3000/api/questions/${testId}`);
    const data = await response.json();
    currentTest = data.map(item => ({
      question: item.question_text,
      options: JSON.parse(item.options),
      correct: item.correct_option
    }));
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }
  async function saveResult(username, testId, score) {
    await fetch("http://localhost:3000/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, testId, score })
    });
  }
  let timer;
  let timeLeft = 30;
  
  function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("questionText").innerHTML += ` <span>(Time: <span id="timer">${timeLeft}</span>s)</span>`;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(""); // Пустий вибір при закінченні часу.
      }
    }, 1000);
  }
  
  function showQuestion() {
    const question = currentTest[currentQuestionIndex];
    document.getElementById("questionText").innerText = question.question;
    startTimer();
    // Решта функції залишається без змін.
  }
      