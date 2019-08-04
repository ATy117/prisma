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
 
    let creator = req.account._id;

    Palette.getPalettes(creator, function(error, palette){    

        res.render("palettes.hbs",{
            username: username,
            firstname: firstname,
            palette: palette
        });
    });
});

// Add a palette page
router.get("/add", (req, res)=>{ 
    let username = req.session.username;
    let firstname = req.account.firstname;
    res.render("addpalette.hbs",{
        username: username,
        firstname: firstname
    });
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
    let creator  = req.account._id;

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
});


// Edit a palette
router.get("/:palette_id/edit", (req, res)=>{ 
    let palette_id = req.params.palette_id;

    console.log("In Edit" + palette_id);

    // Render the edit palette page here
});

// Processing of editing a palette
router.post("/:palette_id/edit_process", (req, res)=>{ 
    let palette_id = req.params.palette_id;

    // call method here
    res.redirect("/palettes");
});


// Delete a palette
router.post("/:palette_id/delete", (req, res)=>{ 
    let palette_id = req.params.palette_id;

    // return the results here (close the modal)
});



module.exports = router;