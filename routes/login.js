const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const path = require('path');
const urlencoder = bodyparser.urlencoded({
    extended : false
});

//DBS and Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/prisma", {
    useNewUrlParser: true
});

//Models
const {Account} = require("../models/Account");
const {Palette} = require("../models/Palette");

//SESSION AND COOKIES
// const session = require("express-session");
// const cookieparser = require("cookie-parser");
// // router.use(cookieparser());
// // router.use(express.static(__dirname+"/public"));
// // router.use(session({
// //     secret : "prismasecret",
// //     name: "prismacookie",
// //     resave: true,
// //     saveUninitialized: true,
// //     cookie: {
// //         maxAge: 1000*60*60*24*365*2
// //     }
// // }))


router.get("/", function(req,res){
    res.sendFile(path.join(__dirname, '../public', 'Login.html'));
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