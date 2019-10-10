
const express = require('express');
const router = express.Router();

const { success,error } = require('../../network/response')
const { listCarreras, addCarreras } = require('./controller')
// const { succes, error } = require("../../network/response")
// const { addCategory } = require("./controller")
// const { iconsFile } = require("../../config")
const { configFile } = require('../../utils/multerFileName')
const upload = configFile('carreras')


router.get('/', (req,res) =>{
    let id = req.query.id || null
    listCarreras(id)
    .then(data =>{
        success(req, res, data, 200)
    })
    .catch((err) =>{
        error(req,res,'Internal error',500,err)
    })
})

router.post('/',upload.array('image'), function (req, resp) {
    addCarreras(req.body,req.files)
        .then(data => {
            success(req, resp, data, 201);
        })
        .catch(err => {
            error(req, resp, 'Datos invalidos', 500, err)
        });
});


module.exports = router
