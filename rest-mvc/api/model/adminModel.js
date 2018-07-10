const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const adminSchema = new Schema({
    // admin_name: {
    //     type: String,
    //     required: true,
    //     // validate: {
    //     //     validator: (v) => {
    //     //         return validator.isAlpha(v)
    //     //     },
    //     //     message: '{VALUE} is incorrect'
    //     // }
    // },  
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            msg: 'Not a valid Email'
        }
    },
    password: {
        type: String,
        required: true
    }
})
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin