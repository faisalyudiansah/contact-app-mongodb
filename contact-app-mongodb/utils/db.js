const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'))
  .catch((err) => console.error(err))

// async function connection() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1/contact-app-dbLocal')
        
//         // testing add contact
//         // let testAddContact = new Contact({
//         //     name: 'Lionel Messi',
//         //     phoneNumber: '081209938373',
//         //     email: 'messi@gmail.com'
//         // })
//         // let saving = await testAddContact.save()
//         // console.log(saving)
//         console.log('Success')
//     } catch (error) {
//         console.log(error)
//     } finally {
//         await mongoose.connection.close()
//     }
// }
// connection()