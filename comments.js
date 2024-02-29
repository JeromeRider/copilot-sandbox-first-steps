// Create web server
// Run: node comment.js
// Access: http://localhost:3000

var express = require('express');
var app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Use body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Use mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'comment'
});
connection.connect();

// Insert comment
app.post('/comment', function(req, res) {
  connection.query('INSERT INTO comment (comment) VALUES (?)', [req.body.comment], function(error, results, fields) {
    if (error) throw error;
    res.redirect('/');
  });
});

// Get comment
app.get('/', function(req, res) {
  connection.query('SELECT * FROM comment', function(error, results, fields) {
    if (error) throw error;
    res.render('comment', { comments: results });
  });
});

app.listen(3000);
console.log('Server is running on http://localhost:3000');