const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
      },
      favorites: [{
        name: String,
        modules: String,
        about: String,
        link: String,
    }],
})

const User = mongoose.model('User',userModel)
module.exports = User