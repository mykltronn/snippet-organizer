const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const route = require('./route/index.js')
const mustacheExpress = require('mustache-express');
const session = require('express-session')
const mongoose = require('mongoose');
//===============================
// mongoose and mLab setup
const dbPassword = ''
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://mykltronn:<dbpassword>@ds043982.mlab.com:43982/snippetdb');
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

app.listen(8080, function(req, res){
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("Server running in DEV mode on http://localhost:8080");
});

module.exports = app;
