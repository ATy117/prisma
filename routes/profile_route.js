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
router.get("/", function(req,res){
    // render the profile
});


//get my followers
router.get("/my_followers", function(req,res){

});

//get accounts I follow
router.get("/followed_accounts", function(req,res){

});

module.exports = router;