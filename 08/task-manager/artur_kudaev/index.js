const {MongoClient, ObjectID} = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, client) => {
  if(err) {
    console.log(err)
  }
  console.log('Connect mongo..')
  const db = client.db("test");
  const collection = db.collection('users');
  // collection.deleteMany({name: 'MyNamg111111'})
  //     .then(del=> console.log(del))
  collection.insertOne({name: 'MyNamg123', age: 23})
      .then((data) => {
        console.log(data.ops[0]._id)
        return collection.deleteOne({name: 'MyNamg123'})
      })
      .then(del=>console.log(del, '-----'))
      .catch(err=>console.log(err))
  // collection.find({}).toArray()
  //     .then(data => console.log(data))
  //client.close();
});