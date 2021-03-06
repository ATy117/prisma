const express = require("express");
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/prisma";
const PORT = process.env.PORT || 3000;
const bodyparser = require("body-parser");
const app = express();
const urlencoder = bodyparser.urlencoded({
    extended : false
});

//DBS and Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("debug", true); 
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useMongoClient: true 
}); 

// Models
const {Account} = require("./models/Account");
const {Palette} = require("./models/Palette");

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

// SOCIAL - Route
app.use('/social', require('./routes/social_route'));

// Home Pages
app.get("/", async function(req,res){
    if (!req.session.username){
        let users = await Account.getAll();
        let palettes = await Palette.getAll();
        res.render("home.hbs",{
            users: users.length,
            palettes: palettes.length
        });
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

app.listen(PORT, function(){
    console.log("Port is Live");
});