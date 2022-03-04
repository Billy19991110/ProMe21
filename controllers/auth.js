const router = require('express').Router();
const express = require('express')
const register = require('./register')
const myform = require('./myform')
const login = require('./login')
const updateuser = require('./updateuser')
// const logout = require('./logout')


// const router = express.Router
// router.get('/logout',logout)

router.post('/login',login)
router.post('/register',register)
router.post('/myform',myform)
router.post('/updateuser',updateuser)





module.exports=router