const {Schema, SchemaTypes, model} = require("mongoose");

const Comments = new Schema({
    userComments: {type: SchemaTypes.ObjectId, ref: "Users"},
    itemComments: {type: SchemaTypes.ObjectId, ref: "Items"}
});

module.exports = model('Comments', Comments)