const express = require('express')
const router = express.Router()
const { allContacts, findContactByName } = require('../utils/contacts');

router.get('/', (req, res) => {
    res.render('home', { layout: 'layouts/main-layout' })
})

router.get('/contacts', (req, res) => {
    let contacts = allContacts()
    res.render('contacts', { layout: 'layouts/main-layout', contacts })
})

router.get('/contact', (req, res) => {
    const { name } = req.query
    let contact = findContactByName(name)
    res.render('detail-contact', { layout: 'layouts/main-layout', contact })
})

router.get('/about', (req, res) => {
    res.render('about', { layout: 'layouts/main-layout' })
})

module.exports = router