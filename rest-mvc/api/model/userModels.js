const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return validator.isEmail(v)
            },
            msg:'it not a valid email'
        }

    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User