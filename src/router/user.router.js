const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
router.post('/signUp', userController.sign_Up)
router.post('/signIn', userController.sign_In)

module.exports = router