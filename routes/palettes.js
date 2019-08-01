const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const path = require('path');
const urlencoder = bodyparser.urlencoded({
    extended : false
});

//Models
const {Account} = require("../models/Account");
const {Palette} = require("../models/Palette");

router.get("/", urlencoder, function(req,res){
    if (!req.session.username){
        res.redirect("/");
    } else {
        let username = req.session.username;
        let firstname;

        Account.getAccountByUsername(username, function(error, user){
            if (error){
                res.send(error);
            } else if (user) {
                firstname = user.firstname;
                res.render("palettes.hbs",{
                    username: username,
                    firstname: firstname
                });
            } 
        });
    }
});

// Add a palette page
router.get("/add", (req, res)=>{ 
    if (!req.session.username){
        res.redirect("/");
    } else {
        let firstname;

        Account.getAccountByUsername(req.session.username, function(error, user){
            if (error){
                res.send(error);
            } else if (user) {
                firstname = user.firstname;
                res.render("addpalette.hbs",{
                    username: req.session.username,
                    firstname: firstname
                });
            } 
        });
        
    }
});


// Processing in adding a palette
router.post("/add_process", urlencoder, function(req,res){
    
    let name = req.body.name;
    let dateCreated = req.body.dateCreated;
    let color1 = req.body.color1;
    let color2 = req.body.color2;
    let color3 = req.body.color3;
    let color4 = req.body.color4;
    let color5 = req.body.color5;
    let creator;

    Account.getAccountByUsername(req.session.username, function(error, user){
        if (error){
            res.send(error);
        } else if (user) {
            creator = user._id;

            let palette = new Palette({
                creator: creator,
                name: name,
                dateCreated: dateCreated,
                color1: color1,
                color2: color2,
                color3: color3,
                color4: color4,
                color5: color5,
                likers: []
            });

            Palette.addPalette(palette, function(palette){
                console.log(palette._id);
                res.send({
                    message: "Success",
                    redirect: "/palettes"
                });
            });
        } 
    });

});



module.exports = router;