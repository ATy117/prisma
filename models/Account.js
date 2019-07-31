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
    }]
});

// STATICS -----------------------------------------------------
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
}

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

//Retrieve account given ID, navigation purposes
accountSchema.statics.getAccountByUsername = function (username, callback){
    this.findOne({
        username: username
    }, callback);
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
    this.followers.push(followedAccount._id);
    this.save().then(callback);
};

const Account = mongoose.model("Account", accountSchema);

module.exports = {
    Account
}