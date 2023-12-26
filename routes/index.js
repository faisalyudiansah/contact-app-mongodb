const express = require('express')
const router = express.Router()
const {
    allContacts,
    findContactByName,
    addContact,
    checkValidationName,
    checkValidationEmail
} = require('../utils/contacts');
const { body, validationResult, check } = require('express-validator')

router.get('/', (req, res) => {
    res.render('home', { layout: 'layouts/main-layout' })
})

router.get('/contacts', (req, res) => {
    let contacts = allContacts()
    res.render('contacts', {
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg')
    })
})

router.get('/detail-contact', (req, res) => {
    const { name } = req.query
    let contact = findContactByName(name)
    res.render('detail-contact', { layout: 'layouts/main-layout', contact })
})

router.get('/add-contact', (req, res) => {
    let { errors } = req.query
    res.render('add-contact', { layout: 'layouts/main-layout', errors })
})

router.post(
    '/add-contact',
    body('name').custom((value) => {
        const validationName = checkValidationName(value)
        if (validationName) {
            throw new Error('Name already in use')
        }
        return true
    }),
    body('email').custom((value) => {
        const validationEmail = checkValidationEmail(value)
        if (validationEmail) {
            throw new Error('E-mail already in use')
        }
        return true
    }),
    check('email', 'Email Invalid').isEmail(),
    check('phoneNumber', 'Phone Number Invalid').isMobilePhone('id-ID'),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let errorMsg = errors.array().map(el => {
                return el.msg
            })
            return res.redirect(`/add-contact?errors=${errorMsg}`)
        }
        let { name, phoneNumber, email } = req.body
        addContact({ name, phoneNumber, email })
        req.flash('msg', 'Data added successfully!')
        res.redirect('/contacts')
    })

router.get('/about', (req, res) => {
    res.render('about', { layout: 'layouts/main-layout' })
})

module.exports = router