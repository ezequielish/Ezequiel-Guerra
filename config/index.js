
require('dotenv').config();

const config = {
    port: process.env.PORT_SERVER || 3000,
    host: process.env.HOST || 'http://localhost',
    urldb: process.env.DB || '',
    publicRoute: process.env.PUBLIC_ROUTE || 'app',
    fileRoute: process.env.FILE_ROUTE || 'carreras'

}

module.exports = config