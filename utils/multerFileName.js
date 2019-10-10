const multer = require('multer')

function configFile(fileRoute) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/${fileRoute}/`)
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString()+file.originalname)// + 
        }
    })

    return upload = multer({ storage })
}


module.exports = {
    configFile
}