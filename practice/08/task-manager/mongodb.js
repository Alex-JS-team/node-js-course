// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName);

    db.collection('users')
        .find({ id: ObjectID('5e19ab836dbcf12c2ec4dcba') })
        .toArray((error, result) => {
            if (error) {
                return console.log('Unable to insert user')
            }
            console.log(result)
        })
})
