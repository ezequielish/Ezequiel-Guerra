
const express = require('express');
const router = express.Router();

const { success,error } = require('../../network/response')
const { sendMail } = require('./controller')


router.post('/', function (req, resp) {
    sendMail(req.body)
        .then(data => {
            success(req, resp, data, 201);
        })
        .catch(err => {
            error(req, resp, 'Datos invalidos', 500, err)
        });
});


module.exports = router
