const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Endpoint: Отримання всіх питань
app.get('/api/questions', (req, res) => {
    db.query('SELECT * FROM tests', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint: Збереження результатів
app.post('/api/results', (req, res) => {
    const { username, score } = req.body;
    db.query('INSERT INTO results (username, score) VALUES (?, ?)', [username, score], (err) => {
        if (err) throw err;
        res.send('Result saved');
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
