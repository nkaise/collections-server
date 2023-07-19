const {Schema, SchemaTypes, model} = require("mongoose");

const Likes = new Schema({
    userLikes: {type: SchemaTypes.ObjectId, ref: "Users"},
    itemLikes: {type: SchemaTypes.ObjectId, ref: "Items"}
});

module.exports = model('Likes', Likes)