const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  "username": {type: String},
  "title": {type: String, required: true},
  "body": {type: String, required: true},
  "notes": String,
  "lang": {type: String, required: true},
  "tags": [String],
  "stared": [String]
})

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
