const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apitokens = new Schema({
    token: String,
    scopes: Array

});

const model = mongoose.model('api-tokens', apitokens);

module.exports = model;