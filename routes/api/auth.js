const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//we use it make sure user sends us fields we required
const {check, validationResult} = require('express-validator/check')

// @route Get api/users
// @desc Test route
// @acces Public
router.get('/', auth, async (req, res)=>{
    try{
        console.log('made it here')
        //we assing value to req.user inside auth.js
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err)
        res.status(500).send('server erorr')
    }
})


// @route Post api/users
// @desc check if such user exists and return token
// @acces Public
//route 
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required)').exists()
    ], 
    async (req, res)=>{
    const errors = validationResult(req)
    //if errors are not empty/ there were errors found
    if(!errors.isEmpty()){
        //send this errors as response
        return res.status(400).json({errors: errors})
    }

    try{    
        const {email, password} = req.body

        let user = await User.findOne({email})

        //if user doesn't exists
        if(!user){
            return res.status(400).json({message:"user with such email doesn't exists"})
        }

        //hashes provided password and checks if it mactches with the user password 
        //assoicated with given email
        const isMatch = await bcrypt.compare(password, user.password)

        //if passwords don't match
        if(!isMatch){
            return res.status(400).json({"msg":"wrong password"})
        }

        const payload = {user:{
            id:user.id
        }}

        //return token
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000}, (err, token)=>{
            if(err) throw err
            res.json({token})
        })
    }catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
})

module.exports = router