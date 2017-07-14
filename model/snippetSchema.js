const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const snippetSchema = new mongoose.Schema({
  username: String,
  title: {type: String, required: true},
  body: {type: String, required: true},
  notes: String,
  "lang": {type: String, required: true},
  "tags": [String]
})

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
