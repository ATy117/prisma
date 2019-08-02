const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const path = require('path');
const urlencoder = bodyparser.urlencoded({
    extended : false
});

//Models
const {Account} = require("../models/Account");


router.get("/", function(req,res){
    if (!req.session.username){
        res.sendFile(path.join(__dirname, '../public', 'Login.html'));
    } else {
        res.redirect("/");
    }
});

router.post("/account_test", urlencoder, function(req,res){
    let usernameTest = req.body.usernameTest;
    let passwordTest = req.body.passwordTest;
    Account.checkAccountExists(usernameTest, passwordTest, function (error, document){
        if (document){
            res.send("Exists");
        } else {
            res.send("NotExists");
        }
    });
});

router.post("/process", urlencoder, function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    Account.login(username, password, function(error, account){
        if (account){
            req.session.username = account.username;
            res.redirect("/");
        } 
    });
    
});

module.exports = router;