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

const checkValidationPhoneNumber = (phoneNumber) => {
    let loadContacts = allContacts()
    let checkPhoneNumber = loadContacts.find((el) => {
        return el.phoneNumber === phoneNumber;
    })
    return checkPhoneNumber
}

const checkValidationEmail = (email) => {
    let loadContacts = allContacts()
    let checkEmail = loadContacts.find((el) => {
        return el.email === email;
    })
    return checkEmail
}

const deleteContact = (name) => {
    let loadContacts = allContacts()
    let filterContact = loadContacts.filter((el) => {
        return el.name.toLowerCase() !== name.toLowerCase()
    })
    saveContact(filterContact)
}

const validationPasswordEmail = (dataToCheck) => {
    let loadContacts = allContacts()
    let filterContact = loadContacts.filter((el) => {
        return el.name.toLowerCase() !== dataToCheck.name.toLowerCase()
    })
    let checkEmail = filterContact.find((el) => {
        return el.email === dataToCheck.email;
    })
    let checkPhoneNumber = filterContact.find((el) => {
        return el.phoneNumber === dataToCheck.phoneNumber;
    })
    if (checkPhoneNumber) {
        return `Phone number must be unique`
    }
    if (checkEmail) {
        return `E-mail must be unique`
    }
}

const updateContact = (dataToUpdate, nameToUpdate) => {
    let loadContacts = allContacts()
    let filterContact = loadContacts.filter((el) => {
        return el.name.toLowerCase() !== nameToUpdate.toLowerCase()
    })
    filterContact.push(dataToUpdate)
    saveContact(filterContact)
}

module.exports = {
    allContacts,
    findContactByName,
    addContact,
    checkValidationName,
    checkValidationEmail,
    checkValidationPhoneNumber,
    deleteContact,
    validationPasswordEmail,
    updateContact,
}