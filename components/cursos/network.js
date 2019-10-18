
const express = require('express');
const router = express.Router();

const { success,error } = require('../../network/response')
const { listCursos,addCursos } = require('./controller')
const { configFile } = require('../../utils/multerFileName')
const upload = configFile('cursos')
const passport = require('passport');
// require('../../utils/auth/strategies/jwt')
const scopeValidationHandler = require('../../utils/middlewares/scopesValidationHandler')

router.get('/', (req,res) =>{
    let id = req.query.id || null
    listCursos(id)
    .then(data =>{
        success(req, res, data, 200)
    })
    .catch((err) =>{
        error(req,res,'Internal error',500,err)
    })
})

router.post('/',
passport.authenticate('jwt', { session: false }),
// scopeValidationHandler(['create:cursos']),
upload.array('image'), function (req, resp) {
    addCursos(req.body,req.files)
        .then(data => {
            success(req, resp, data, 201);
        })
        .catch(err => {
            error(req, resp, 'Datos invalidos', 500, err)
        });
});


module.exports = router
