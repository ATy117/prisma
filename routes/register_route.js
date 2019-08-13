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
    res.sendFile(path.join(__dirname, '../public', 'Register.html'));
});

router.post("/username_test", urlencoder, function(req,res){
	let usernameTest = req.body.usernameTest;

    Account.checkUniqueUsername(usernameTest, function(error, document){
        if (error){
            res.send(error);
        } else if (document) {
            res.send("Exists")
        } else {
            res.send("Available");
        }
    });
});

router.post("/process", urlencoder, function (req, res){
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    let account = new Account({
        username : username,
        password : password,
        firstname: firstname,
        lastname: lastname,
        followed: [],
        followers: [],
        likedPalettes: []
    }); 

    Account.addAccount(account, function(account){
        req.session.username = account.username;
        if (req.session.colors_from_home){
            res.redirect("/palettes/special_add");
        } else {
            res.redirect("/");
        }
        
    }, (error)=>{
        res.send(error);
    })
});

router.post("/save_from_home", urlencoder, function(req,res){
    req.session.colors_from_home = {
        "color1" : req.body.color1,
        "color2" : req.body.color2,
        "color3" : req.body.color3,
        "color4" : req.body.color4,
        "color5" : req.body.color5
    }
    res.send("Saved");
});

module.exports = router;