var express = require('express');
var app = express();
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', (req, res) => {
  res.render('index');
});

// about page
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/diceroller', (req, res) => {
  res.render('diceroller');
});

app.listen(5000);
console.log("starting!");