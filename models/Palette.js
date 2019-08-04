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

//Search for a palette
paletteSchema.statics.searchPalette = function(query, callback){
    this.findOne({
        "name": { "$regex": query, "$options": "i" }
    }, callback);
};

//Update a palette and edit it
paletteSchema.statics.updatePalette = function(paletteID, updated, callback){
    this.update({
        _id: paletteID
    }, {
        name : updated.name,
        color1: updated.color1,
        color2: updated.color2,
        color3: updated.color3,
        color4: updated.color4,
        color5: updated.color5
    }, {
        new: true
    }, callback); // callback is error and document
};

//Delete a palette
paletteSchema.statics.deletePalette = function(paletteID, callback){
    this.deleteOne({
        _id : paletteID
    }, callback); // callback is error and document
};


const Palette = mongoose.model("Palette", paletteSchema);

module.exports = {
    Palette
}