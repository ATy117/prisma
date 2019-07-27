const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "Account"
    }]
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
    Account
}