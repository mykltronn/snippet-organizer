const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const route = require('./route/index.js')
const mustacheExpress = require('mustache-express');
const session = require('express-session')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/snippetdb')
//===============================
// middleware
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', "./public/views");
app.use(morgan('dev'));
app.use(express.static('public'));
//===============================
// session
app.use(session({
  secret: 'magical thinking',
  resave: false,
  saveUninitialized: true
}));
//===============================
// routes
app.use('/api', route)

app.get('/', function(req, res) {
    res.redirect('/api')
})

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

/*
app.set('port', (process.env.PORT || 8080))
app.listen(app.get('port'), function() {
  console.log("Express server listening!", this.address().port, app.settings.env);
});
*/

app.listen(8080, function(req, res){
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("Server running in DEV mode on http://localhost:8080");
});

module.exports = app;
