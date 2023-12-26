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

module.exports = { allContacts, findContactByName }