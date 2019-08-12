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

// View the profile
router.get("/", async function(req,res){

    let account = req.account;
    
    // get liked palettes
    let paletteResults = await account.getLikedPalettes();
    let palettes = [];
    let palettesCount = 0;
    for (let i= 0; i< paletteResults.length; i++){
        // Palette json object
        let unpopulatedResult = paletteResults[i];

        let oneResult = await unpopulatedResult.populateCreator();

        //Check if you are following this user
        // The user info to be rendered
        let soloPalette = {
            "id" : oneResult._id,
            "name" : oneResult.name,
            "firstname": oneResult.creator.firstname,
            "lastname" : oneResult.creator.lastname,
            "dateCreated" : oneResult.dateCreated,
            "color1": oneResult.color1,
            "color2": oneResult.color2,
            "color3": oneResult.color3,
            "color4": oneResult.color4,
            "color5": oneResult.color5
        };
        palettes.push(soloPalette);
        palettesCount++;
    }

    // get accounts YOU ARE FOLLOWING
    let followingResults = await account.getFollowed();
    let followings = [];
    let followingCount = 0;
    for (let i= 0; i< followingResults.length; i++){
        // User json object
        let oneResult = followingResults[i];


        // The user info to be rendered
        let soloUser = {
            "id" : oneResult._id,
            "firstname": oneResult.firstname,
            "lastname" : oneResult.lastname,
            "username" : oneResult.username
        };
        followings.push(soloUser);
        followingCount++;
    }

    // get accounts FOLLOWING YOU
    let followerResults = await account.getFollowers();
    let followers = [];
    let followerCount = 0;
    for (let i= 0; i< followerResults.length; i++){
        // User json object
        let oneResult = followerResults[i];

        //Check if you are following this user
        let following = null;
        let isFollowing = await account.checkIfFollowing(oneResult._id);
        if (isFollowing){
            following = "notNull";
        }

        // The user info to be rendered
        let soloUser = {
            "id" : oneResult._id,
            "firstname": oneResult.firstname,
            "lastname" : oneResult.lastname,
            "username" : oneResult.username,
            "following" : following
        };
        followers.push(soloUser);
        followerCount++;
    }
    // render the profile
    res.render("myprofile.hbs", {
        username: req.account.username,
        firstname: req.account.firstname,
        lastname: req.account.lastname,
        likedCount: palettesCount,
        palettes: palettes,
        followingCount: followingCount,
        followings: followings,
        followerCount: followerCount,
        followers: followers,
    });
});


//get my followers
router.get("/my_followers", function(req,res){

});

//get accounts I follow
router.get("/followed_accounts", function(req,res){

});

module.exports = router;