
const carreras = require('../components/carerras/network')


function routes(server){
    server.use("/carreras", carreras)
}

module.exports = {
    routes
}