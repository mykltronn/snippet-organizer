const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  "username": {type: String, unique: true},
  "title": {type: String, required: true},
  "body": {type: String, required: true},
  "notes": String,
  "lang": {type: String, required: true},
  "tags": [String],
  "stared": [String],
  "created_at": Date,
  "modified_at": Date
})

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
