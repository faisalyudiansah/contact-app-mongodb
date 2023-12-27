const { body, check } = require('express-validator')
require('../utils/db')
const Contact = require('../models/contact')

const isFieldUnique = async (value, field, message) => {
    const existingContact = await Contact.findOne({ [field]: value })
    if (existingContact) {
        throw new Error(message)
    }
    return true
}

const validateSaveContact = [
    body('name', 'Name is required').notEmpty(),
    body('phoneNumber', 'Phone Number is required').notEmpty(),
    body('email', 'E-mail is required').notEmpty(),
    body('name').custom(value => isFieldUnique(value, 'name', 'Name already exists')),
    body('phoneNumber').custom(value => isFieldUnique(value, 'phoneNumber', 'Phone Number already exists')),
    body('email').custom(value => isFieldUnique(value, 'email', 'E-mail already exists')),
    check('email', 'Email Invalid').isEmail(),
    check('phoneNumber', 'Phone Number Invalid').isMobilePhone('id-ID'),
]

module.exports = validateSaveContact