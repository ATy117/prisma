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
    let query = req.params.query;
    console.log("in here " + query);

    let userResults = await Account.searchAccount(query);

    let paletteResults = await Palette.searchPalette(query);

    console.log(userResults);
    console.log(paletteResults);
    res.render("search.hbs", {
        username: req.account.username,
        firstname: req.account.firstname,
        query: query,
    });
});





module.exports = router;