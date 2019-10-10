const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carreras = new Schema({
    nombre: String,
    image: String,
    icon: String

});

const model = mongoose.model('Carreras', carreras);

module.exports = model;