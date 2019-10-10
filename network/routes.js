
const carreras = require('../components/carerras/network')
const cursos = require('../components/cursos/network')

function routes(server){
    server.use("/carreras", carreras)
    server.use("/cursos", cursos)
}

module.exports = {
    routes
}