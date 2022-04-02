const express = require('express');
const config = require('config');

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// we use it make sure user sends us fields we required
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');

// @route Get api/users
// @desc registration route
// @acces Public

// validates against existence, emptynes and legnth of specified field and throw given error if
// it doesn't pass
router.post(
  '/',
  [check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if errors are not empty, thus there were errors found
    if (!errors.isEmpty()) {
    // send this errors as response
      return res.status(400).json({ errors });
    }

    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });

      // checks if user exists, to defend against duplicate user creation
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const avatar = gravatar.url(email, {
        s: 200, // default size,
        r: 'pg', // default rating, pg means no nudity
        d: 'mm', // defualt image if no were found
      });

      user = new User({
        name, email, avatar, password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
