
require('dotenv').config();

const config = {
    port: process.env.PORT_SERVER || 3000,
    host: process.env.HOST || 'http://localhost',
    urldb: process.env.DB || '',
    publicRoute: process.env.PUBLIC_ROUTE || 'app',
    fileRoute: process.env.FILE_ROUTE || 'carreras',
    fileCursos: process.env.FILE_CURSOS || 'cursos',
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    pubicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN
}

module.exports = config