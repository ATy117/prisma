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
    if (!req.session.username){
        res.sendFile(__dirname + "/public/Home.html");
    } else {
        let firstname;

        Account.findOne({
            username: req.session.username
        }, (error, document)=>{
            if (error){
                res.send(error);
            } else if (document) {
                firstname = document.firstname;
                res.render("feed.hbs",{
                    username: req.session.username,
                    firstname: firstname
                });
            } 
        });
        
    }
});

app.get("/about", function(req,res){
    res.sendFile(__dirname + "/public/About.html");
});



// LOGIN
app.get("/login", function(req,res){
    res.sendFile(__dirname + "/public/Login.html");
});

app.post("/login_username_test", urlencoder, function(req,res){
    let usernameTest = req.body.usernameTest;
    let passwordTest = req.body.passwordTest;
    
    Account.findOne({
        username : usernameTest,
        password: passwordTest
    }, (error, document)=>{
        if (error){
            res.send(error);
        } else if (document) {
            res.send("Exists")
        } else {
            res.send("NotExists");
        }
    });
});

app.post("/login_process", urlencoder, function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    Account.findOne({
        username : username,
        password: password
    }, (error, document)=>{
        if (error){
            res.send(error);
        } else if (document) {
            req.session.username = document.username;
            res.redirect("/");
        }
    });
});


//Register
app.get("/register", function(req,res){
    res.sendFile(__dirname + "/public/Register.html");
});

app.post("/register_username_test", urlencoder, function(req,res){
	console.log(req.body.usernameTest);
	let usernameTest = req.body.usernameTest;

    Account.findOne({
        username : usernameTest
    }, (error, document)=>{
        if (error){
            res.send(error);
        } else if (document) {
            res.send("Exists")
        } else {
            res.send("Available");
        }
    });
});

app.post("/register_process", urlencoder, function (req, res){
    console.log("in server");
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

    account.save().then((document)=>{
        // ALl goes well
        console.log(document);
        res.send("Registered Successfully\n");
    }, (error)=>{
        //all goes to hell
        res.send(error);
    });
});

app.get("/logout", (req,res) =>{
    req.session.destroy((error)=>{
        console.log("Logged Out");
    });
    res.redirect("/");
});

app.get("/palettes", (req, res)=>{
    res.render("palettes.hbs");
});

app.get("/addPalette", (req, res)=>{
    res.render("addpalette.hbs");
});



app.listen(9090, function(){
    console.log("Port is Live");
});