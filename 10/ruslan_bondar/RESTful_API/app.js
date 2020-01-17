const express = require('express');
const mongoose = require('mongoose');
const user = require('./User');
const task = require('./Task');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {
    res.write('<html>');
    res.write('<body>');
    res.write('<div style="padding: 25px"><a href="/users">Users<a/></div>');
    res.write('<div style="padding: 25px"><a href="/tasks">Tasks<a/></div>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
});

app.get('/users', (req, res) => {
    if (req.query.id) {
        user.User.findById(req.query.id).then((users) => {
            res.send(users);
        });
    } else {
        user.User.find().then((users) => {
            res.send(users);
        });
    }
});

// const newTask = new task.Task({
//     description: 'Drink coffee',
//     completed: false
// });

// newTask.save();

app.get('/tasks', (req, res) => {
    if (req.query.id) {
        task.Task.findById(req.query.id).then((tasks) => {
            res.send(tasks);
        });
    } else {
        task.Task.find().then((tasks) => {
            res.send(tasks);
        });
    }
});

// app.post('/users', (req, res) => {
//     user.User.insertMany(
//         [
//             { name: 'Andrew', age: 30 },
//             { name: 'Ross', age: 40 }
//         ]
//     ).then((users) => {
//         res.send(users);
//     })
// });

app.listen(3000);