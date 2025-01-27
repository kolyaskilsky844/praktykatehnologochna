const mysql = require('mysql');
const fs = require('fs');

// Підключення до бази даних
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '19612046', // Ваш пароль
  database: 'test_app'
});

// Завантаження JSON-файлу з питаннями
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

// Додавання питань до бази
questions.forEach((q) => {
  const query = 'INSERT INTO tests (category, question, correct_option) VALUES (?, ?, ?)';
  db.query(query, [q.category, q.question, q.correct_option], (err) => {
    if (err) throw err;
    console.log(`Question added: ${q.question}`);
  });
});

// Закриття з'єднання
db.end();
