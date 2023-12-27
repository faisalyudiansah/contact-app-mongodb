const { MongoClient, ObjectId } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const dbName = 'contact-app-dbLocal'

const client = new MongoClient(uri)

async function main() {
    try {
        await client.connect()
        console.log('Connected successfully to server')
        const db = client.db(dbName)
        const databases = await db.admin().listDatabases();
        const databaseExists = databases.databases.some(db => db.name === dbName);
        if (!databaseExists) {
            throw new Error(`Database '${dbName}' does not exist.`);
        }

        //=================================================================== Insert One Contact
        // await db.collection('Users').insertOne({
        //     name: "Lionel Messi",
        //     phoneNumber: "081937890044",
        //     email: "messi@gmail.com"
        // })

        //=================================================================== Insert Many Contact
        // await db.collection('Users').insertMany([
        //     {
        //         name: "Higuain",
        //         phoneNumber: "081230033044",
        //         email: "higuain@gmail.com"
        //     },
        //     {
        //         name: "Pogba",
        //         phoneNumber: "082394900434",
        //         email: "pogba@gmail.com"
        //     },
        // ])

        //=================================================================== Show Contact
        // const showData = await db.collection('Users').find().toArray()
        // console.log(showData)

        //=================================================================== Show Contact By Name
        // const showData = await db.collection('Users').find({
        //     name: "Cristiano Ronaldo"
        // }).toArray()
        // console.log(showData)

        //=================================================================== OR Show Contact By Name
        // const showData = await db.collection('Users').findOne({
        //     name: "Cristiano Ronaldo"
        // })
        // console.log(showData)

        //=================================================================== OR Show Contact By ID
        // const objectId = new ObjectId('658c3670dfe7ca714958594f')
        // const showData = await db.collection('Users').findOne({
        //     _id: objectId
        // })
        // console.log(showData)

        //=================================================================== Update One Contact By ID
        // const objectId = new ObjectId('658c3670dfe7ca714958594f')
        // const updateOne = await db.collection('Users').updateOne(
        //     {
        //         _id: objectId
        //     },
        //     {
        //         $set: {
        //             name: 'Cristiano Ronaldo'
        //         }
        //     }
        // )
        // console.log(updateOne)

        //=================================================================== Update Many Contact By ID
        // const objectIds = [
        //     new ObjectId('658c3c78a2bfb6f206efc33b'), 
        //     new ObjectId('658c3c78a2bfb6f206efc33c'), 
        // ]
        // const updateMany = await db.collection('Users').updateMany(
        //     {
        //         _id: {
        //             $in: objectIds
        //         }
        //     },
        //     {
        //         $set: {
        //             name: 'Stupid Player'
        //         }
        //     }
        // )
        // console.log(updateMany)

        //=================================================================== Delete One Contact By ID
        // const objectId = new ObjectId('658c3bfe0fa1b06e8fc385ec')
        // const deleteOne = await db.collection('Users').deleteOne(
        //     {
        //         _id: objectId
        //     }
        // )
        // console.log(deleteOne)

        //=================================================================== Delete Many Contact By ID
        const objectIds = [
            new ObjectId('658c3c78a2bfb6f206efc33b'), 
            new ObjectId('658c3c78a2bfb6f206efc33c'), 
        ]
        const updateMany = await db.collection('Users').deleteMany(
            {
                _id: {
                    $in: objectIds
                }
            }
        )
        console.log(updateMany)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}
main()

// client.connect((error, client) => {
//     if (error){
//         return console.log('Failed', error)
//     }
//     console.log('Connected successfully to server')
//     console.log(client)
// })