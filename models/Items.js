// const {Schema, SchemaTypes, model} = require("mongoose");

// const Items = new Schema({
//     name: {type: String, required: true},
//     tags: {type: String, required: true},
//     likes: {type: Number},
//     comments: {type: Number}
// });

// module.exports = model('Items', Items)

const { Schema, model } = require("mongoose");

const Items = new Schema({
  name: { type: String, required: true },
  tags: { type: String, required: true },
  likes: {type: Number},
  comments: {type: Number}
});

additionalFields.forEach((field) => {
  switch (field.type) {
    case "integer":
        Items.add({
        [field.name]: { type: Number, required: false },
      });
      break;
    case "string":
        Items.add({
        [field.name]: { type: String, required: false },
      });
      break;
    case "longString":
        Items.add({
        [field.name]: { type: String, required: false, textarea: true },
      });
      break;
    case "boolean":
        Items.add({
        [field.name]: { type: Boolean, required: false },
      });
      break;
    case "date":
        Items.add({
        [field.name]: { type: Date, required: false },
      });
      break;
    default:
      // Обработка других типов полей
      break;
  }
});

module.exports = model("Items", Items);
