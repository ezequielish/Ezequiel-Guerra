const express = require('express');
const router = express.Router();
const { success, error } = require('../../network/response')
const { signin } = require('./controller')
const { signup } = require('../../components/users/controller')
router.post('/sign-in', (req, res) =>{
    const { apiKeyToken } = req.body;
    signin(apiKeyToken, req, res)
        .then(data => {
            success(req,res,data,200)
        })

        .catch(err =>{
            error(req,res,err.message,500,err)
        })
});

router.post('/sign-up', (req, res) =>{
    const { username,password,name } = req.body;
    signup(username,password,name)
        .then(data => {
            success(req,res,data,200)
        })

        .catch(err =>{
            error(req,res,err.message,500,err)
        })
});


module.exports = router;