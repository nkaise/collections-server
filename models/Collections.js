// const {Schema, SchemaTypes, model} = require("mongoose");

// const Collections = new Schema({
//     name: {type: String, required: true},
//     description: {type: String, required: true},
//     theme: {type: String, enum: ["Books", "Wines", "Cards", "Toys", "Coins", "Shoes", "Pictures"], required: true},
//     userID: {type: SchemaTypes.ObjectId, ref: "Users"}
// });

// module.exports = model('Collections', Collections)

const { Schema, SchemaTypes, model } = require("mongoose");

const AdditionalFieldSchema = new Schema({
  name: { type: String, required: false },
  type: { type: String, required: false }, 
});

const Collections = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // theme: { type: SchemaTypes.ObjectId, ref: "Themes", required: true },
  theme: {
    type: {
        _id: { type: SchemaTypes.ObjectId, ref: "Themes", required: true },
        name: { type: String, required: true }
    },
    required: true
  },
  userId: { type: SchemaTypes.ObjectId, ref: "Users" },
  additionalFields: [AdditionalFieldSchema], 
});

module.exports = model("Collections", Collections);
