const fs = require('fs');

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

const dirData = './data/contacts.json'
if (!fs.existsSync(dirData)) {
    fs.writeFileSync(dirData, '[]', 'utf-8')
}

const allContacts = () => {
    const contacts = JSON.parse(fs.readFileSync(dirData, 'utf-8'))
    return contacts
}

const findContactByName = (name) => {
    let loadContacts = allContacts()
    let findContact = loadContacts.find((el) => {
        return el.name.toLowerCase() === name.toLowerCase();
    })
    return findContact
}

const saveContact = (newData) => {
    let parsing = JSON.stringify(newData, null, 2)
    fs.writeFileSync(dirData, parsing, 'utf-8')
}

const addContact = (data) => {
    let loadContacts = allContacts()
    loadContacts.push(data)
    saveContact(loadContacts)
}

const checkValidationName = (name) => {
    let loadContacts = allContacts()
    let checkName = loadContacts.find((el) => {
        return el.name === name;
    })
    return checkName
}

const checkValidationEmail = (email) => {
    let loadContacts = allContacts()
    let checkEmail = loadContacts.find((el) => {
        return el.email === email;
    })
    return checkEmail
}

module.exports = {
    allContacts,
    findContactByName,
    addContact,
    checkValidationName,
    checkValidationEmail
}