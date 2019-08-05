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

router.post("/account_test", urlencoder, async function(req,res){
    let usernameTest = req.body.usernameTest;
    let passwordTest = req.body.passwordTest;
    let exists = await Account.checkAccountExists(usernameTest, passwordTest);

    if (exists){
        res.send("Exists");
    } else {
        res.send("NotExists");
    }
});

router.post("/process", urlencoder, function(req, res){
    Account.getAccountByUsername(req.body.username, function(error, account){
        if (error){
            res.send(error);
        } else if (account) {
            req.session.username = account.username;
            res.redirect("/");
        } 
    });
});

module.exports = router;