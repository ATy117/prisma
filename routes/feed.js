const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const path = require('path');
const urlencoder = bodyparser.urlencoded({
    extended : false
});

//Models
const {Account} = require("../models/Account");
const {Palette} = require("../models/Palette");


router.get("/", function(req,res){
    let username = req.session.username;
    let firstname;
    
    Account.getAccountByUsername(username, function(error, user){
        firstname = user.firstname;
        res.render("feed.hbs",{
            username: username,
            firstname: firstname
        });
    });

    
});

module.exports = router;