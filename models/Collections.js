const { Schema, SchemaTypes, model } = require("mongoose");

const Collections = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  theme: {
    type: {
        _id: { type: SchemaTypes.ObjectId, ref: "Themes", required: true },
        name: { type: String }
    },
    required: true
  },
  userId: { type: SchemaTypes.ObjectId, ref: "Users" },
  additionalFields: [{ type: Schema.Types.Mixed }],
});

module.exports = model("Collections", Collections);
