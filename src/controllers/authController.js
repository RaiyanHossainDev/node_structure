const { randomNum, timeGenerator, randomCharsGen } = require("../helpers/allGenerators")
const { phoneRegex, passwordRegex, emailRegex } = require("../helpers/regex")
const authModel = require("../models/authModel")
const bcrypt = require('bcrypt');

// ======================= Register Controller
const register = async (req,res)=>{
    try { 
        const {username,email,phone,gender,password} = req.body
        let avatar = ''
        const code = randomCharsGen()
        const otpTimeOut = timeGenerator(4)
        
        if(!username || !email || !phone || !gender || !password) return res.status(404).send("items not found")
        
        if(!phoneRegex.test(phone) || !passwordRegex.test(password) || !emailRegex.test(email)) return res.status(400).send("invalid items")
    
        if(gender == 'male') avatar = "https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg"
        if(gender == 'female') avatar = "https://www.clipartmax.com/png/middle/121-1214390_female-avatar-female-avatar.png"
        
        const hashedPass = await bcrypt.hash(password, 10)
    
        const saveModel = new authModel({
            username:username,password:hashedPass,email:email,phone:phone,gender:gender,avatar:avatar,code:code,codeTimeOut:otpTimeOut
        })
    
        saveModel.save()
    
        res.status(201).send("account created")
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

// ======================= OTP verification Controller
const otpVerification = (req,res)=>{
    // const 
}

module.exports = {register,otpVerification}