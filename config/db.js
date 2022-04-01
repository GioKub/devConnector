<<<<<<< HEAD
const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('mongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
=======
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () =>{
    try{
        await mongoose.connect(db)
        console.log('mongoDB connected...')
    }catch(err){
        console.error(err.message)
        process.exit(1)

    }
}

module.exports = connectDB;
>>>>>>> 4530fc85b26f6a4e0357aae68ac5d96837960b41
