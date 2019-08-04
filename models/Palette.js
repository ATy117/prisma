const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paletteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    name: String,
    dateCreated: String,
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


//Used for adding palettes given palette object, then return that object
paletteSchema.statics.addPalette = function(palette, callback){
    palette.save().then(callback);
};

//Used for rerieving all palettes given an ID
paletteSchema.statics.getPalettes = function(creator, callback){
    this.find({
        creator: creator
    }, callback);
};
const Palette = mongoose.model("Palette", paletteSchema);

module.exports = {
    Palette
}