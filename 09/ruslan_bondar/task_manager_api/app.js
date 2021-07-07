const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const me = new User({
    name: 'Ruslan',
    age: 26
});

const notMe = new User({
    name: 'Unknown',
    age: 100
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
})

notMe.save().then(() => {
    console.log(notMe);
}).catch((error) => {
    console.log(error);
})

User.find().then((users) => {
    console.log(users);
}).catch((error) => {
    console.log(error);
})

User.insertMany(
    [
        { name: 'Bob', age: 30 },
        { name: 'Bill', age: 40 }
    ]
).then((users) => {
    console.log(users);
}).catch((error) => {
    console.log(error);
})

User.deleteMany({ age: 26 }).then((users) => {
    console.log(users);
}).catch((error) => {
    console.log(error);
})

User.deleteOne({ name: 'Unknown' }).then((user) => {
    console.log(user);
}).catch((error) => {
    console.log(error);
})

User.update({ age: 30 }, { name: 'Billie' }).then((user) => {
    console.log(user);
}).catch((error) => {
    console.log(error);
})