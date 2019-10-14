
const carreras = require('../components/carerras/network')
const cursos = require('../components/cursos/network')
const auth = require('../components/auth/network')

function routes(server){
    server.use("/carreras", carreras)
    server.use("/cursos", cursos)
    server.use("/sign-in", auth)
}

module.exports = {
    routes
}