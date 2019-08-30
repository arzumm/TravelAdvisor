const express = require('express'); 
const router = express.Router(); 
const { User } = require("../models"); 
const crypto = require("crypto"); 

function hashPassword(password) {
    let hash = crypto.createHash("sha256"); 
    hash.update(password); 
    return hash.digest("hex"); 
}

module.exports = function(passport) {

router.post('/signup', function(req, res){
    let newUser = new User({
        username: req.body.username, 
        password: hashPassword(req.body.password), 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        country: req.body.country
    }); 

    User.findOne({username: req.body.username}, function(err, user){
        if (!user) {
            newUser.save(function(err, success){
                if (err) {
                    res.json({success: false, error: err});
                }
                if (!err) {
                    res.json({success: true, error: ""})
                }
            }); 
        }

        if (user) {
            console.log('user already exists'); 
            res.json({success: true, error: ""}); 
        }
    })
}); 

router.post("/login", passport.authenticate("local", {
    successRedirect: "/login/success", 
    failureRedirect: "/login/failure", 
})); 

router.get("/login/success", (req, res) => {
    res.json({ success: true});
    console.log("success", req.user, req.session.user);
    return;
});

router.get("/login/failure", (req, res) => {
    res.json({ success: false });
    return;
});

router.get("/logout", function(req, res) {
    req.logout(); 
    res.json({
        success: true, 
        error: ""
    }); 
}); 

router.use((req, res, next) => {
    // console.log("cookies", req.cookies, req.session);

    // console.log("This is the user in the use", req.user);
    if (!req.user) {
        res.status(401).json({
            success: false,
            error: "Not authorized",
        });
        return;
    }
    next();
});

return router;

}

