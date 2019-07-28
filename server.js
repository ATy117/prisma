const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const urlencoder = bodyparser.urlencoded({
    extended : false
});

//DBS and Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true
});

//Models
const {Account} = require("./models/Account");
const {Palette} = require("./models/Palette");

//SESSION AND COOKIES
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(express.static(__dirname+"/public"));
app.use(session({
    secret : "prismasecret",
    name: "prismacookie",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*365*2
    }
}))

// HBS
const hbs = require('hbs');
app.set("view engine", "hbs");


// Home Pages
app.get("/", function(req,res){
    if (!req.session.userid){
        res.sendFile(__dirname + "/public/Home.html");
    } else {
        
    }
});

app.get("/about", function(req,res){
    res.sendFile(__dirname + "/public/About.html");
});
 
app.get("/login", function(req,res){
    res.sendFile(__dirname + "/public/Login.html");
});

app.get("/register", function(req,res){
    res.sendFile(__dirname + "/public/Register.html");
});




app.listen(9090, function(){
    console.log("Port is Live");
});