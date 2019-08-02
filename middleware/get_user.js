
const {Account} = require("../models/Account");
const check_user = function(req,res,next){
    Account.getAccountByUsername(req.session.username, function(error, user){
        if (error){
            res.send(error);
        } else if (user) {
            req.account = user;
            next();
        } 
    });
}

module.exports = check_user;