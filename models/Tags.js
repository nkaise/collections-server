const {Schema, SchemaTypes, model} = require("mongoose");

const Tags = new Schema({
    name: {type: String, required: true},
    itemTags: {type: SchemaTypes.ObjectId, ref: "Items"}
});

module.exports = model('Tags', Tags)