const {Schema, model} = require("mongoose");

const Themes = new Schema({
    name: {
        type: String,
        required: true,
      },
});

module.exports = model('Themes', Themes)