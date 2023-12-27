const mongoose = require('mongoose')

let Contact = mongoose.model('Contact', {
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})

module.exports = Contact