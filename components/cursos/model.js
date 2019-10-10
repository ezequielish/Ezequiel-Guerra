const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cursos = new Schema({
    carrera: {
        type: Schema.ObjectId,
        ref: 'Carreras'
    },
    nombre: String,
    image: String,
    icon: String

});

const model = mongoose.model('Cursos', cursos);

module.exports = model;