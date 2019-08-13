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

//Middleware
const login_checker = require("../middleware/check_user");
const account_getter = require("../middleware/get_user");

router.use(login_checker);
router.use(account_getter);


router.get("/", async function(req,res){
    let username = req.session.username;
    let firstname = req.account.firstname;

    let account = req.account;

    let peoples = await account.getFollowed();

    let feedPalettes = [];

    for (let i= 0; i< peoples.length; i++){
        let onePerson = peoples[i];

        let palettesOfOnePerson = await onePerson.getPalettes();

        for (let k = 0; k < palettesOfOnePerson.length; k++){
            let onePalette = palettesOfOnePerson[k];

            let finalPalette = await onePalette.populateCreator();

            //Check if you are following this user
            let liked = null;
            let isLiked = await account.checkIfLiked(finalPalette._id);
            if (isLiked){
                liked= "notNull";
            }

            let soloPalette = {
                "id" : finalPalette._id,
                "name" : finalPalette.name,
                "firstname": finalPalette.creator.firstname,
                "lastname" : finalPalette.creator.lastname,
                "dateCreated" : finalPalette.dateCreated,
                "liked" : liked,
                "color1": finalPalette.color1,
                "color2": finalPalette.color2,
                "color3": finalPalette.color3,
                "color4": finalPalette.color4,
                "color5": finalPalette.color5
            };
            feedPalettes.push(soloPalette);
        }

    }
 
    res.render("feed.hbs",{
        username: username,
        firstname: firstname,
        feedPalettes: feedPalettes
    });
});

module.exports = router;