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