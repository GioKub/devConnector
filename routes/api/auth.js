const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth')
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

module.exports = router