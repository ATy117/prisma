const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    followed: [{
        type: Schema.Types.ObjectId,
        ref: "Account"
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "Account"
    }],
    likedPalettes: [{
        type: Schema.Types.ObjectId,
        ref: "Palette"
    }]
});

// STATICS -----------------------------------------------------

//Retrieve account given ID, navigation purposes
accountSchema.statics.getAccountByUsername = function (username, callback){
    this.findOne({
        username: username
    }, callback);
};
// Use for checking if username exists
accountSchema.statics.checkUniqueUsername = function(usernameTest, callback){
    this.findOne({
        username : usernameTest
    }, callback); 
};

// Use for checking if account exists
accountSchema.statics.checkAccountExists = function(usernameTest, passwordTest, callback){
    this.findOne({
        username : usernameTest,
        password : passwordTest
    }, callback);
};

//User for adding accounts, given account object, then return that object
accountSchema.statics.addAccount = function(account, callback){
    account.save().then(callback);
};

//Logging in retrieve of account
accountSchema.statics.login = function(username, password, callback){
    this.findOne({
        username : username,
        password: password
    }, callback);
};

//Search for an account
accountSchema.statics.searchAccount = function(query, callback){
    this.findOne({
        $or: [
            { "username": { "$regex": query, "$options": "i" }},
            { "firstname": { "$regex": query, "$options": "i" }},
            { "lastname": { "$regex": query, "$options": "i" }}
        ]}, callback);
};



// METHODS ---------------------------------------------------------------
//Retrieve followers
accountSchema.methods.getFollowers = function(callback){
    Account.findOne({
        username: this.username
    }).populate('followers').exec(callback);
};

//Retrieve followed
accountSchema.methods.getFollowed = function(callback){
    Account.findOne({
        username: this.username
    }).populate('followed').exec(callback);
};

// Follow an account
accountSchema.methods.followAccount = function(followedAccount, callback){
    let me = this;
    let id = this._id;
    this.followed.push(followedAccount._id);
    // Save urself as follower of the other account
    Account.findOne({
        username: this.username
    }, function(error, document){
        document.followers.push(id);
        document.save().then((document)=>{
            me.save().then(callback);
        });
    });
};

// Unfollow


// Like Palatte


// Unlike Palette


const Account = mongoose.model("Account", accountSchema);

module.exports = {
    Account
}