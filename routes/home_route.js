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


router.get("/", function(req,res){
    let username = req.session.username;
    let firstname = req.account.firstname;
 
    res.render("feed.hbs",{
        username: username,
        firstname: firstname
    });
});

module.exports = router;