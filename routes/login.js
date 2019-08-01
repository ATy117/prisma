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
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public', 'Login.html'));
});

router.post("/username_test", urlencoder, function(req,res){
    let usernameTest = req.body.usernameTest;
    let passwordTest = req.body.passwordTest;
    let accountExists = Account.checkAccountExists(usernameTest, passwordTest);

    if (accountExists){
        res.send("Exists")
    } else {
        res.send("NotExists");
    }
});

module.exports = router;