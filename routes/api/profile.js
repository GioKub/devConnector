const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route Get api/profile/me
// @desc get current users profile
// @acces Private
router.get('/me', auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar'])
        
        if(!profile){
            return res.status(400).json({msg:"there is no profile for this user"})
        }

        res.json(profile)
    }catch(err){
        console.error(err)
        res.status(500).send('server error')

    }

})

module.exports = router