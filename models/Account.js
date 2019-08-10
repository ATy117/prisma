const mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const {Palette} = require("../models/Palette");

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

// Hashes on save
accountSchema.pre('save', function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

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
accountSchema.statics.checkAccountExists = async function(usernameTest, passwordTest){
    let user = await this.findOne({ 
        username: usernameTest 
    }).exec();

    if(!user) {
        return false;
    }
    let goods;
    await user.comparePassword(passwordTest, (error, match) => {
        if(!match) {
            goods = false;
        } else {
            goods = true;
        }
    });

    return goods;

};


//User for adding accounts, given account object, then return that object
accountSchema.statics.addAccount = function(account, callback){
    account.save().then(callback);
};

//Search for an account
accountSchema.statics.searchAccount = function(query, callback){
    this.find({
        $or: [
            { "username": { "$regex": query, "$options": "i" }},
            { "firstname": { "$regex": query, "$options": "i" }},
            { "lastname": { "$regex": query, "$options": "i" }}
        ]}, function(error, results){
            // Pre process here
            callback();
        });
};



// METHODS ---------------------------------------------------------------

// Comparing passwords
accountSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};
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

// FOLLOW------------------------------------------------------------
// Follow an account
accountSchema.methods.addToFollowed = function(accountID, callback){
    Account.updateOne({
        _id: this.id
    }, {
        $push: {
            followed: accountID
        }
    }, {
        new: true
    }, function (error, oneWhoFollowed){
        // After saving
        Account.findById({
            _id: accountID
        }, function (error, oneHeFollowed){
            //Add this user to the followers of the other account
            oneHeFollowed.addToFollowers(this.id, callback); // callback is error, account followed
        })
    });
};

// Supplementary to follow account
accountSchema.methods.addToFollowers = function(accountID, callback){
    Account.updateOne({
        _id: this.id
    }, {
        $push: {
            followers: accountID
        }
    }, {
        new: true
    }, callback);
};

// UNFOLLOW------------------------------------------------------------
// UnFollow an account
accountSchema.methods.removeFromFollowed = function(accountID, callback){
    Account.updateOne({
        _id: this.id
    }, {
        $pull: {
            followed: accountID
        }
    }, {
        new: true
    }, function (error, oneWhoFollowed){
        // After saving
        Account.findById({
            _id: accountID
        }, function (error, oneHeFollowed){
            //Remove this user from the followers of the other account
            oneHeFollowed.removeFromFollowers(this.id, callback); // callback is error, account followed
        })
    });
};

// Supplementary to unfollow account
accountSchema.methods.removeFromFollowers = function(accountID, callback){
    Account.updateOne({
        _id: this.id
    }, {
        $pull: {
            followers: accountID
        }
    }, {
        new: true
    }, callback);
};

// Like Palatte
accountSchema.methods.likePalette = function(paletteID, callback){
    Account.updateOne({
        _id: this.id
    }, {
        $push: {
            likedPalettes: paletteID
        }
    }, {
        new: true
    }, function (error, account){
        // After saving
        Palette.findById({
            _id: paletteID
        }, function (error, likedPalette){
            //Add this user to the likers of that palette
            likedPalette.addToLikers(this.id, callback); // callback is error, paletteLiked
        })
    });
};


// Unlike Palette
// Like Palatte
accountSchema.methods.unlikePalette = function(paletteID, callback){
    Account.updateOne({
        _id: this.id
    }, {
        $pull: {
            likedPalettes: paletteID
        }
    }, {
        new: true
    }, function (error, account){
        // After saving
        Palette.findById({
            _id: paletteID
        }, function (error, unlikedPalette){
            //Add this user to the likers of that palette
            unlikedPalette.removeFromLikers(this.id, callback); // callback is error, paletteLiked
        })
    });
};

const Account = mongoose.model("Account", accountSchema);

module.exports = {
    Account
}