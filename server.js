const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const urlencoder = bodyparser.urlencoded({
    extended : false
});

//DBS and Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/prisma", {
    useNewUrlParser: true
});

//Middlewares
const account_getter = require(__dirname+"/middleware/get_user");
const login_checker = require(__dirname+"/middleware/check_user");

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
}));

// HBS
const hbs = require('hbs');
app.set("view engine", "hbs");

// LOGIN - route
app.use('/login', require('./routes/login_route'));

//REGISTER - Route
app.use('/register', require('./routes/register_route'));

//REGISTER - Route
app.use('/palettes', require('./routes/palettes_route'));

//PROFILE - Route
app.use('/profile', require('./routes/profile_route'));

//SEARCH - Route
app.use('/search', require('./routes/search_route'));

// HOME - Route
app.use('/home', require('./routes/home_route'));

// Home Pages
app.get("/", function(req,res){
    if (!req.session.username){
        res.sendFile(__dirname + "/public/Home.html");
    } else {
        res.redirect("/home");
    }
});

app.get("/logout", (req,res) =>{
    req.session.destroy((error)=>{
        console.log("Logged Out");
    });
    res.redirect("/");
});

app.get("/about", function(req,res){
    res.sendFile(__dirname + "/public/About.html");
});

app.listen(3000, function(){
    console.log("Port is Live");
});