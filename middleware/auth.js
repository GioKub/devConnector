<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from head
  const token = req.header('x-auth-token');

  // check if token wasn't passed
  if (!token) {
    res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // saves decoded.user as local varibale accesable thoruh req.user
    req.user = decoded.user;

    next();
    // this gets executed if token wasn't valid
  } catch (err) {
    res.status(401).json({ msg: "token isn't valid" });
  }
};
=======
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    //get token from head
    const token = req.header('x-auth-token')

    //check if token wasn't passed
    if(!token){
        res.status(401).json({msg:"No token, authorisation denied"})
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //saves decoded.user as local varibale accesable thoruh req.user
        req.user = decoded.user

        next()
    //this gets executed if token wasn't valid
    }catch(err){
        res.status(401).json({msg:"token isn't valid"})
    }
}

>>>>>>> 4530fc85b26f6a4e0357aae68ac5d96837960b41
