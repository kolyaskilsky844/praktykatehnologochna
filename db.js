const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // замініть на вашого користувача
    password: '19612046', // ваш пароль
    database: 'test_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = db;
