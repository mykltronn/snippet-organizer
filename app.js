const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const route = require('./route/index.js')
const mustacheExpress = require('mustache-express');
//===============================
// middleware
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', "./public/views");
app.use(morgan('dev'));
app.use(express.static('public'));
//===============================
// routes
app.use('/api', route)

app.listen(8080, function(req, res){
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("Server running in DEV mode on http://localhost:8080");
});
