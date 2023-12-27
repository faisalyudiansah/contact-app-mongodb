const { body, check } = require('express-validator')
require('../utils/db')
const Contact = require('../models/contact')

const isFieldUnique = async (value, reqquery, field, message) => {
    const validationName = await Contact.findOne({ [field]: value })
    if (value !== reqquery && validationName) {
        throw new Error(message)
    }
    return true
}

const validateUpdateContact = [
    body('name', 'Name is required').notEmpty(),
    body('phoneNumber', 'Phone Number is required').notEmpty(),
    body('email', 'E-mail is required').notEmpty(),
    body('name').custom((value, { req }) => isFieldUnique(value, req.query.nameToUpdate, 'name', 'Name already exists')),
    body('phoneNumber').custom((value, { req }) => isFieldUnique(value, req.query.phToUpdate, 'phoneNumber', 'Phone Number already exists')),
    body('email').custom((value, { req }) => isFieldUnique(value, req.query.emailToUpdate, 'email', 'E-mail already exists')),
    check('email', 'Email Invalid').isEmail(),
    check('phoneNumber', 'Phone Number Invalid').isMobilePhone('id-ID')
]

module.exports = validateUpdateContact