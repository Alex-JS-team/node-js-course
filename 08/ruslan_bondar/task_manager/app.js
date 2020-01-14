const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) {
		return console.log('Error');
	}

	const db = client.db(databaseName);

	db.collection('users').insertOne({ name: 'Andrew', age: 27 })
		.then(result => db.collection('users').deleteOne({ _id: ObjectID }))





	

	// db.collection('users').find({
	// 	name: 'Andrew'
	// }).toArray((error, result) => {
	// 	console.log(result);
	// });

	// db.collection('users').deleteOne({
	// 	name: 'Andrew'
	// }, (error, result) => {
	// 	if (error) {
	// 		return console.log('Unable to delete user');
	// 	}
	// });
});
