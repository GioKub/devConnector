<<<<<<< HEAD
const express = require('express');

const router = express.Router();
=======
const express = require('express')
const router = express.Router()
>>>>>>> 4530fc85b26f6a4e0357aae68ac5d96837960b41

// @route Get api/users
// @desc Test route
// @acces Public
<<<<<<< HEAD
router.get('/', (req, res) => {
  res.send('posts route');
});

module.exports = router;
=======
router.get('/', (req, res)=>{
    res.send("posts route")
})

module.exports = router
>>>>>>> 4530fc85b26f6a4e0357aae68ac5d96837960b41
