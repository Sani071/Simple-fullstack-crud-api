const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const contactSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => {
                return /^(?:\+88|01)?(?:\d{11}|\d{13})$/.test(v)
            },
            msg: 'It not a phone number'
        }
    }
})
const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact