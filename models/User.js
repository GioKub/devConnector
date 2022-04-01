<<<<<<< HEAD
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
=======
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: String,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema)
>>>>>>> 4530fc85b26f6a4e0357aae68ac5d96837960b41
