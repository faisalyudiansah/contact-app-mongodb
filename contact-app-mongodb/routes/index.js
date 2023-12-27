const router = require('express').Router()
const validateSaveContact = require('../utils/validationSaveContact')
const validateUpdateContact = require('../utils/validationUpdateContact')
const MainController = require('../controllers/MainController');

router.get('/', MainController.homePage)
router.get('/contacts', MainController.contactsPage)
router.get('/detail-contact', MainController.detailContactPage)
router.get('/add-contact', MainController.addContactPage)
router.post('/contact', validateSaveContact, MainController.saveNewContact)
router.delete('/contact', MainController.deleteContact)
router.get('/edit-contact', MainController.editContactPage)
router.put('/contact', validateUpdateContact, MainController.saveNewUpdateContact)
router.get('/about', MainController.aboutPage)

module.exports = router