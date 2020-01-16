const express = require('express');
const connect = require('./connect');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', mongoose.Schema());

app.get('/users', (req, res) => {
    console.log(req.query)
    if (req.query.id) {
        User.findById(req.query.id).then((users) => {
            res.send(users);
        });
    } else {
        User.find().then((users) => {
            res.send(users);
        });
    }
});

app.listen(3000);












// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })



// const task = new Task({
//     description: '  Eat lunch'
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })