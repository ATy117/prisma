const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paletteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    name: String,
    color1: {
        type: String,
        uppercase: true
    },
    color2: {
        type: String,
        uppercase: true
    },
    color3: {
        type: String,
        uppercase: true
    },
    color4: {
        type: String,
        uppercase: true
    },
    color5: {
        type: String,
        uppercase: true
    },
    likers : [{
        type: Schema.Types.ObjectId,
        ref: "Account"
    }]
});


//User for adding accounts, given account object, then return that object
paletteSchema.statics.addAccount = function(palette, callback){
    palette.save().then(callback);
};

const Palette = mongoose.model("Palette", paletteSchema);

module.exports = {
    Palette
}