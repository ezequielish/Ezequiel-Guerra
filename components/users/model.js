const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = new Schema({
    name: String,
    username: String,
    password: String,
    isAdmin: Boolean,

});

const model = mongoose.model('Users', users);

module.exports = model;