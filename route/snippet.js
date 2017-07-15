const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const expressValidator = require ('express-validator')
const morgan = require('morgan');
const Snippet = require('../model/snippetSchema.js')
const User = require('../model/userSchema.js')
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/snippetdb')
//===========================================================
//authentication
var currentUser;
passport.use(new BasicStrategy(
  function(username, password, done) {
    currentUser = username;
    console.log("basic strategy is running");
    User.findOne( { username: username }, function(err, user){
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));
//===========================================================
// middleware
router.use(bodyParser.urlencoded({ extended : false }));
router.use(bodyParser.json());
router.use(expressValidator());
router.use(morgan('dev'));
router.use(passport.authenticate('basic', {session: false}))
//===========================================================
// routes

/* --> //add user for test
router.post('/', function(req, res) {
    console.log("trying to add new user");

    const newSnippet = new User();
    newSnippet.username = req.body.username;
    newSnippet.password = req.body.password

    newSnippet.save(function(err){
      if (err){
        res.send(err)
      }
      else {
        console.log("new user added to db");
        res.send('new user added');
      }

    })
})

 <!-- */

// get all snippets
router.get('/', function(req, res) {
    Snippet.find(function(err, snippets) {
      if(err) res.send(err);

      res.json(snippets);
    })
})

// post new snippet
router.post('/', function(req, res) {
    const newSnippet = new Snippet();
    newSnippet.username = currentUser;
    newSnippet.title = req.body.title;
    newSnippet.body = req.body.body;
    newSnippet.notes = req.body.notes;
    newSnippet.lang = req.body.lang;
    newSnippet.tags.push(req.body.tag);

    newSnippet.save(function(err){
      if (err){
        res.send(err)
      }
      else {
        console.log("new snippet added to db");
        res.send('new snippet added! \n' + newSnippet);
      }

    })
})

// edit one snippet by :id
router.put('/:id', function(req, res) {
    Snippet.findById(req.params.id, function(err, snippet){
        if(req.body.title) snippet.title = req.body.title;
        if(req.body.body) snippet.body = req.body.body;
        if(req.body.notes) snippet.notes = req.body.notes;
        if(req.body.lang) snippet.lang = req.body.lang.toLowerCase();
        if(req.body.tag) snippet.tags.push(req.body.tag.toLowerCase());

        snippet.save(function(err){
            if (err) res.send(err)
            console.log("snippet edited" + snippet);
            res.send('snippet edited! \n' + snippet);
        })
    })
})

// remove one snippet entry by :id
router.delete('/:id', function(req, res) {
    Snippet.remove({_id: req.params.id}, function(err, activity) {
        if (err) res.send(err)
        res.send('snippet removed from db')
    })
})

// get one snippet by :id
router.get('/:id', function(req, res) {
    Snippet.findById(req.params.id, function(err, snippet) {
        if(err) res.send(err);

        res.json(snippet);
    })
})

// get all snippets by :lang


// get all snippets by :tags
router.get('/tag/:tag', function(req, res) {
    Snippet.find({ tags: req.params.tag.toLowerCase()}, function(err, snippet) {
        res.send(snippet)
    })


})


module.exports = router;
// Activity.find({}, function(err, activity) {
//         console.log(activity);
//             for (i=0; i < activity.length; i++){
//                 console.log(activity[i]);
//                     for (j=0; j < activity[i].stat.length; j++){
//                         if (activity[i].stat[j]._id ==  req.params.stat_id) {
//                             var deletePosition = activity[i].stat.indexOf(activity[i].stat[j])
//                             console.log(deletePosition);
//                             console.log("removing: " + activity[i].stat[j]);
//                             activity[i].stat.splice(deletePosition, 1);
//                             activity[i].save(function(err) {
//                               if (err) {
//                                   console.log("something went wrong saving the altered stat");
//                                   res.send(err)
//                               }
//                               else{
//                                   console.log("deleted");
//                                   res.send("stat removed")
//                               }
//                             })
//                         }
//                 }
//             }
//         })
