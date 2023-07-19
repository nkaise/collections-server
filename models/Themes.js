const {Schema, model} = require("mongoose");

const Themes = new Schema({
    // name: {
    //     type: Array,
    //     default: [], 
    //     required: true
    // },
    name: {
        type: String,
        required: true,
      },
});

module.exports = model('Themes', Themes)