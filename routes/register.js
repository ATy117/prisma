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
        followers: []
    }); 

    Account.addAccount(account, (document)=>{
        res.send("Registered Successfully\n");
    }, (error)=>{
        res.send(error);
    })
});

module.exports = router;