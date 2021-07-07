const MongoClient = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) {
		return console.log('Error');
	}

	const db = client.db(databaseName);

	db.collection('users').insertOne({ name: 'Billy', age: 27 });

	db.collection('users').deleteOne({ _id: ObjectID });

	db.collection('users').insertMany(
		[
			{ 
				name: 'John', 
				age: 29 
			},
			{ 
				name: 'Bill', 
				age: 25 
			}
		]
	);

	db.collection('users').deleteMany({ name: "Andrew" });

	db.collection('users').updateOne(
		{ 
			_id: ObjectID("5e1f8ecfc60e703818897c64") 
		}, 
		{ 
			$set: { 
				name: "Bob" 
			}
		}
	);

	db.collection('users').updateMany({ age: 27 }, { $set: { name: "Ann" }});

	db.collection('users').find({
		name: 'Andrew'
	}).toArray((error, result) => {
		console.log(result);
	});
});
