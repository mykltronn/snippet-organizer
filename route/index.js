const express = require('express');
const router = express.Router();
const route = require('./snippet.js')
//===============================
// middleware
//===============================
// routes
router.use('/snippet', route)

router.route('/')
    .get(function(req, res) {
        res.render('index.mustache')
    })
    .post(function(req, res) {
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.email = req.body.email;

        newUser.save(function(err){
            if (err) res.send(err)
            else {
                console.log("new user added to db");
                res.send('new user added');
            }
        })
    })

//===============================
// export router
module.exports = router;
