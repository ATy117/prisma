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

// View the base search page
router.get("/:query", async function(req,res){
    // render the profile
    let account = req.account;
    let query = req.params.query;

    let userResults = await Account.searchAccount(query);
    let paletteResults = await Palette.searchPalette(query);

    let users = [];
    let usersCount = 0;
    for (let i= 0; i< userResults.length; i++){
        // User json object
        let oneResult = userResults[i];

        //Check if you are following this user
        let following = null;
        let isFollowing = await account.checkIfFollowing(oneResult._id);
        if (isFollowing){
            following = "notNull";
        }

        // Check if this account is yours
        let your_account = null;
        if (account.username == oneResult.username){
            your_account = "yours";
        }

        // The user info to be rendered
        let soloUser = {
            "id" : oneResult._id,
            "firstname": oneResult.firstname,
            "lastname" : oneResult.lastname,
            "username" : oneResult.username,
            "following" : following,
            "your_account" : your_account
        };
        users.push(soloUser);
        usersCount++;
    }

    let palettes = [];
    let palettesCount = 0;
    for (let i= 0; i< paletteResults.length; i++){
        // Palette json object
        let unpopulatedResult = paletteResults[i];

        let oneResult = await unpopulatedResult.populateCreator();

        //Check if you are following this user
        let liked = null;
        let isLiked = await account.checkIfLiked(oneResult._id);
        if (isLiked){
            liked= "notNull";
        }
        // The user info to be rendered
        let soloPalette = {
            "id" : oneResult._id,
            "name" : oneResult.name,
            "firstname": oneResult.creator.firstname,
            "lastname" : oneResult.creator.lastname,
            "dateCreated" : oneResult.dateCreated,
            "liked" : liked,
            "color1": oneResult.color1,
            "color2": oneResult.color2,
            "color3": oneResult.color3,
            "color4": oneResult.color4,
            "color5": oneResult.color5
        };
        palettes.push(soloPalette);
        palettesCount++;
    }
    
    res.render("search.hbs", {
        username: req.account.username,
        firstname: req.account.firstname,
        query: query,
        usersCount: usersCount,
        users: users,
        palettesCount: palettesCount,
        palettes: palettes
    });
});





module.exports = router;