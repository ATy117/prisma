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

// Home Pages
app.get("/", function(req,res){
    if (!req.session.username){
        res.sendFile(__dirname + "/public/Home.html");
    } else {
        res.redirect("/home");
    }
});

app.get("/home", account_getter,function(req,res){
    let username = req.session.username;
    let firstname = req.account.firstname;

    res.render("feed.hbs",{
        username: username,
        firstname: firstname
    });
});

app.get("/about", function(req,res){
    res.sendFile(__dirname + "/public/About.html");
});

app.listen(3000, function(){
    console.log("Port is Live");
});





// //Register
// app.get("/register", function(req,res){
//     res.sendFile(__dirname + "/public/Register.html");
// });

// app.post("/register_username_test", urlencoder, function(req,res){
// 	let usernameTest = req.body.usernameTest;

//     // Account.findOne({
//     //     username : usernameTest
//     // }, (error, document)=>{
//     //     if (error){
//     //         res.send(error);
//     //     } else if (document) {
//     //         res.send("Exists")
//     //     } else {
//     //         res.send("Available");
//     //     }
//     // });

//     Account.checkUniqueUsername(usernameTest, function(error, document){
//         if (error){
//             res.send(error);
//         } else if (document) {
//             res.send("Exists")
//         } else {
//             res.send("Available");
//         }
//     });
// });

// app.post("/register_process", urlencoder, function (req, res){
//     console.log("in server");
//     var username = req.body.username;
//     var password = req.body.password;
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;

//     let account = new Account({
//         username : username,
//         password : password,
//         firstname: firstname,
//         lastname: lastname,
//         followers: []
//     }); 

//     // account.save().then((document)=>{
//     //     // ALl goes well
//     //     console.log(document);
//     //     res.send("Registered Successfully\n");
//     // }, (error)=>{
//     //     //all goes to hell
//     //     res.send(error);
//     // });

//     Account.addAccount(account,(document)=>{
//         // ALl goes well
//         console.log(document);
//         // Sample following
//         // document.followAccount(document, function(document){
//         //     console.log(document.followers);
//         //     document.getFollowers(function(error, followers){
//         //         console.log(followers.followers[0]);
//         //     });
//         //     res.send("Registered Successfully\n");
//         // }, function(error){

//         // });

//         res.send("Registered Successfully\n");
        
//     }, (error)=>{
//         //all goes to hell
//         res.send(error);
//     })
// });

// app.get("/logout", (req,res) =>{
//     req.session.destroy((error)=>{
//         console.log("Logged Out");
//     });
//     res.redirect("/");
// });

// // Profile Navigating

// app.get("/palettes", (req, res)=>{

//     if (!req.session.username){
//         res.redirect("/");
//     } else {
//         let firstname;

//         Account.findOne({
//             username: req.session.username
//         }, (error, document)=>{
//             if (error){
//                 res.send(error);
//             } else if (document) {
//                 firstname = document.firstname;
//                 res.render("palettes.hbs",{
//                     username: req.session.username,
//                     firstname: firstname
//                 });
//             } 
//         });
        
//     }
// });


// // Add a palette
// app.get("/add_palette", (req, res)=>{
//     if (!req.session.username){
//         res.redirect("/");
//     } else {
//         let firstname;

//         Account.findOne({
//             username: req.session.username
//         }, (error, document)=>{
//             if (error){
//                 res.send(error);
//             } else if (document) {
//                 firstname = document.firstname;
//                 res.render("addpalette.hbs",{
//                     username: req.session.username,
//                     firstname: firstname
//                 });
//             } 
//         });
        
//     }
// });

// // Add palette process
// app.post("/add_palette_process", urlencoder, (req, res)=>{
//     let name = req.body.name;
//     let dateCreated = req.body.dateCreated;
//     let color1 = req.body.color1;
//     let color2 = req.body.color2;
//     let color3 = req.body.color3;
//     let color4 = req.body.color4;
//     let color5 = req.body.color5;

//     let id;

//     Account.getAccountByUsername(req.session.username, function(error, document){
//         id = document._id;
//     });
// });
