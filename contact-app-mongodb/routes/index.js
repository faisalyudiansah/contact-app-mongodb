const express = require('express')
const router = express.Router()
const {
    allContacts,
    findContactByName,
    addContact,
    checkValidationName,
    checkValidationEmail,
    checkValidationPhoneNumber,
    deleteContact,
    validationPasswordEmail,
    updateContact,
} = require('../utils/contacts');
const { body, validationResult, check } = require('express-validator')

require('../utils/db')
const Contact = require('../models/contact');

router.get('/', (req, res) => {
    res.render('home', { layout: 'layouts/main-layout' })
})

router.get('/contacts', async (req, res) => {
    let contacts = await Contact.find()
    res.render('contacts', {
        layout: 'layouts/main-layout',
        contacts,
        msgSuccess: req.flash('msgSuccess'),
        msgError: req.flash('msgError')
    })
})

router.get('/detail-contact', async (req, res) => {
    let contact = await Contact.findOne({
        name: req.query.name
    })
    res.render('detail-contact', { layout: 'layouts/main-layout', contact })
})

router.get('/add-contact', (req, res) => {
    let { errors } = req.query
    res.render('add-contact', { layout: 'layouts/main-layout', errors })
})

router.post(
    '/contact',
    body('name', 'Name is required').notEmpty(),
    body('phoneNumber', 'Phone Number is required').notEmpty(),
    body('email', 'E-mail is required').notEmpty(),
    body('name').custom(async (value) => {
        const validationName = await Contact.findOne({ name: value })
        if (validationName) {
            throw new Error('Name already exists')
        }
        return true
    }),
    body('phoneNumber').custom(async (value) => {
        const validationPhoneNumber = await Contact.findOne({ phoneNumber: value })
        if (validationPhoneNumber) {
            throw new Error('Phone Number already exists')
        }
        return true
    }),
    body('email').custom(async (value) => {
        const validationEmail = await Contact.findOne({ email: value })
        if (validationEmail) {
            throw new Error('E-mail already exists')
        }
        return true
    }),
    check('email', 'Email Invalid').isEmail(),
    check('phoneNumber', 'Phone Number Invalid').isMobilePhone('id-ID'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let errorMsg = errors.array().map(el => {
                return el.msg
            })
            return res.redirect(`/add-contact?errors=${errorMsg}`)
        }
        let { name, phoneNumber, email } = req.body
        await Contact.insertMany({ name, phoneNumber, email })
        req.flash('msgSuccess', 'Contact added successfully!')
        res.redirect('/contacts')
    })

router.delete('/contact', async (req, res) => {
    let findContact = await Contact.findOne({
        name: req.query.name
    })
    if (!findContact) {
        req.flash('msgError', 'Request Invalid')
        return res.redirect('/contacts')
    }
    await Contact.deleteOne({
        _id: findContact._id
    })
    req.flash('msgSuccess', 'Contact successfully deleted')
    return res.redirect('/contacts')
})

router.get('/edit-contact', async (req, res) => {
    const { errors } = req.query
    let findContact = await Contact.findOne({
        name: req.query.name
    })
    if (!findContact) {
        req.flash('msgError', 'Request Invalid')
        return res.redirect('/contacts')
    }
    res.render('edit-contact', { layout: 'layouts/main-layout', findContact, errors })
})

router.put(
    '/contact',
    body('name', 'Name is required').notEmpty(),
    body('phoneNumber', 'Phone Number is required').notEmpty(),
    body('email', 'E-mail is required').notEmpty(),
    body('name').custom(async (value, { req }) => {
        const validationName = await Contact.findOne({ name: value })
        if (value !== req.query.nameToUpdate && validationName) {
            throw new Error('Name already exists')
        }
        return true
    }),
    check('email', 'Email Invalid').isEmail(),
    check('phoneNumber', 'Phone Number Invalid').isMobilePhone('id-ID'),
    async (req, res) => {
        const { nameToUpdate } = req.query
        let findContact = await Contact.findOne({
            name: nameToUpdate
        })
        if (!findContact) {
            req.flash('msgError', 'Request Invalid')
            return res.redirect('/contacts')
        }
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let errorMsg = errors.array().map(el => {
                return el.msg
            })
            return res.redirect(`/edit-contact?name=${nameToUpdate}&errors=${errorMsg}`)
        }

        let { name, phoneNumber, email } = req.body
        let checkValidation = validationPasswordEmail({ name, phoneNumber, email })
        if (checkValidation) {
            return res.redirect(`/edit-contact?name=${nameToUpdate}&errors=${checkValidation}`)
        }
        updateContact({ name, phoneNumber, email }, nameToUpdate)
        req.flash('msgSuccess', 'Contact has been updated')
        return res.redirect('/contacts')
    })

router.get('/about', (req, res) => {
    res.render('about', { layout: 'layouts/main-layout' })
})

module.exports = router