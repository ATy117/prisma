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

//search for a palette
router.get("/palette/:keyword" , function(req,res){
    let keyword = req.params.keyword;

});

//search for an account
router.get("/account/:keyword", function(req,res){
    let keyword = req.params.keyword;
});

//like a palette
router.post("/palette/like/:palette_id", function (req,res){
    let palette_id = req.params.palette_id;

});

//follow a user
router.post("/account/follow/:account_id", function(req,res){

});

module.exports = router;