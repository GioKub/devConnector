<<<<<<< HEAD
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
=======
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
>>>>>>> 4530fc85b26f6a4e0357aae68ac5d96837960b41

// @route Get api/profile/me
// @desc get current users profile
// @acces Private
<<<<<<< HEAD
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
});

// @route Post api/profile/
// @desc  Create or update user profile
// @acces Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusernmae,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // build a profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusernmae) profileFields.githubusernmae = githubusernmae;
    if (skills) {
      // HTML, CSS , JS => [HTML, CSS, JS]
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        );
        return res.json(profile);
      }

      // create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
=======
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
>>>>>>> 4530fc85b26f6a4e0357aae68ac5d96837960b41
