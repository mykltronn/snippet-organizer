const express = require('express');
const router = express.Router();
const route = require('./snippet.js');
const bodyParser = require('body-parser');
const Snippet = require('../model/snippetSchema.js');
const User = require('../model/userSchema.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// dev mongoose.connect('mongodb://localhost:27017/snippetdb');
mongoose.connect('mongodb://mykltronn:jKT9HU9tKB47@ds043982.mlab.com:43982/snippetdb')
//===============================
// middleware
router.use(bodyParser.urlencoded({ extended : false }));
router.use(bodyParser.json());
//===============================
// routes
router.use('/snippet', route)

router.route('/')
    .get(function(req, res) {
        if (!req.session.registered) req.session.registered = false
        res.render('index.mustache', {registered: req.session.registered})
    })
    .post(function(req, res) {
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.email = req.body.email;

        newUser.save(function(err){
            if (err) res.send(err)
            req.session.registered = true
            res.redirect('/');
        })
    })

//===============================
// export router
module.exports = router;
