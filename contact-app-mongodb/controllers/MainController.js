const { validationResult } = require('express-validator')
require('../utils/db')
const Contact = require('../models/contact');

class MainController {
    static async homePage(req, res) {
        try {
            res.render('home', { layout: 'layouts/main-layout' })
        } catch (error) {
            console.log(error)
        }
    }

    static async contactsPage(req, res) {
        try {
            let contacts = await Contact.find()
            res.render('contacts', {
                layout: 'layouts/main-layout',
                contacts,
                msgSuccess: req.flash('msgSuccess'),
                msgError: req.flash('msgError')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async detailContactPage(req, res) {
        try {
            let contact = await Contact.findOne({
                name: req.query.name
            })
            res.render('detail-contact', { layout: 'layouts/main-layout', contact })
        } catch (error) {
            console.log(error)
        }
    }

    static async addContactPage(req, res) {
        try {
            let { errors } = req.query
            res.render('add-contact', { layout: 'layouts/main-layout', errors })
        } catch (error) {
            console.log(error)
        }
    }

    static async saveNewContact(req, res) {
        try {
            const errors = validationResult(req)
            console.log(errors)
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
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteContact(req, res) {
        try {
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
        } catch (error) {
            console.log(error)
        }
    }

    static async editContactPage(req, res) {
        try {
            const { errors } = req.query
            let findContact = await Contact.findOne({
                name: req.query.name
            })
            if (!findContact) {
                req.flash('msgError', 'Request Invalid')
                return res.redirect('/contacts')
            }
            res.render('edit-contact', { layout: 'layouts/main-layout', findContact, errors })
        } catch (error) {
            console.log(error)
        }
    }

    static async saveNewUpdateContact(req, res) {
        try {
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

            await Contact.updateOne(
                {
                    name: nameToUpdate
                },
                {
                    $set: { name, phoneNumber, email }
                }
            )
            req.flash('msgSuccess', 'Contact has been updated')
            return res.redirect('/contacts')
        } catch (error) {
            console.log(error)
        }
    }

    static async aboutPage(req, res) {
        try {
            res.render('about', { layout: 'layouts/main-layout' })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MainController