
const carreras = require('../components/carerras/network')
const cursos = require('../components/cursos/network')
const auth = require('../components/auth/network')
const contact = require('../components/emailContact/network')
function routes(server){
    server.use("/carreras", carreras)
    server.use("/cursos", cursos)
    server.use("/auth", auth)
    server.use("/contact",contact)
}

module.exports = {
    routes
}