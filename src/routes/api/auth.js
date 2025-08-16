const express = require('express')
const {register, otpVerification} = require('../../controllers/authController')
const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/otpVerification', otpVerification)

module.exports = authRoute