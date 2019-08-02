
const check_user = function(req,res,next){
    if(!req.session.username){
        res.redirect("/");
    }
    next();
}

module.exports = check_user;