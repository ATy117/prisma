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

// Like a palette
router.post("/like_palette/:palettedID", function(req,res){
    let palettedID = req.params.palettedID;
    let account = req.account;

    account.likePalette(palettedID, function(error, palette){
        if (palette){
            res.send("Success");
        } else {
            res.send("Failed");
        }
    });
});

// Unlike a palette
router.post("/unlike_palette/:palettedID", function(req,res){
    let palettedID = req.params.palettedID;
    let account = req.account;

    account.unlikePalette(palettedID, function(error, palette){
        if (palette){
            res.send("Success");
        } else {
            res.send("Failed");
        }
    });
});

// Follow an account
router.post("/follow_account/:accountID", function(req,res){
    let accountID = req.params.accountID;
    let account = req.account;

    account.addToFollowed(accountID, function(error, account){
        if (account){
            res.send("Success");
        } else {
            res.send("Failed");
        }
    });
});

// Unfollow an account
router.post("/unfollow_account/:accountID", function(req,res){
    let accountID = req.params.accountID;
    let account = req.account;

    account.removeFromFollowed(accountID, function(error, account){
        if (account){
            res.send("Success");
        } else {
            res.send("Failed");
        }
    });
});

module.exports = router;