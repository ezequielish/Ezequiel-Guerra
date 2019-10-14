const express = require('express');
const router = express.Router();
const { success, error } = require('../../network/response')
const { signin } = require('./controller')
router.post('/', (req, res, next) =>{
    const { apiKeyToken } = req.body;
    signin(apiKeyToken, req, res, next)
        .then(data => {
            success(req,res,data,200)
        })

        .catch(err =>{
            error(req,res,err.message,500,err)
        })

});




module.exports = router;