const express = require('express')
const router = express.Router()

// @route Get api/users
// @desc Test route
// @acces Public
router.get('/', (req, res)=>{
    res.send("auth route")
})

module.exports = router