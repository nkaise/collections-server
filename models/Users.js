const {Schema, SchemaTypes, model} = require("mongoose");

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    status: {type: String, enum: ['active', 'blocked'], default: 'active'}
});

module.exports = model('User', User)