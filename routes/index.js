const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home.ejs', { layout: 'layouts/main-layout' })
})

router.get('/contacts', (req, res) => {
    res.render('contacts.ejs', { layout: 'layouts/main-layout' })
})

router.get('/about', (req, res) => {
    res.render('about.ejs', { layout: 'layouts/main-layout' })
})

module.exports = router