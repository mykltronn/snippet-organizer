const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const route = require('./route/snippet.js')
//===============================
// middleware
app.use(morgan('dev'));
//===============================
// routes
app.use('/api/snippet', route)

app.listen(8080, function(req, res){
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("VVV VVV    VVV VVV     VVV VVV");
  console.log("Server running in DEV mode on http://localhost:8080");
});
