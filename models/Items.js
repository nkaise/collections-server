const { Schema, SchemaTypes, model } = require("mongoose");

const Items = new Schema({
  name: { type: String, required: true },
  tags: [{ type: String, required: true }],
  collectionId: { type: SchemaTypes.ObjectId, ref: "Collections" },
  likes: {type: Number},
  comments: {type: Number}
});

module.exports = model("Items", Items);
