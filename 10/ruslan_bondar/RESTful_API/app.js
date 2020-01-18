const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');
const Task = require('./Task');

const app = express();
app.use(express.json());

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
        User.findById(req.query.id).then((users) => {
            res.send(users);
        });
    } else {
        User.find().then((users) => {
            res.send(users);
        });
    }
});

app.post('/users', (req, res) => {
    const newUser = new User(req.body);

    newUser.save().then((user) => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(500).send(error);
    })
});

app.delete('/users', (req, res) => {
    User.deleteMany(req.body).then((user) => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(500).send(error);
    })
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
});

// tasks ---------------------->

app.get('/tasks', (req, res) => {
    if (req.query.id) {
        Task.findById(req.query.id).then((tasks) => {
            res.send(tasks);
        });
    } else {
        Task.find().then((tasks) => {
            res.send(tasks);
        });
    }
});

app.post('/tasks', (req, res) => {
    const newTask = new Task(req.body);

    newTask.save().then((task) => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(500).send(error);
    })
});

app.delete('/tasks', (req, res) => {
    Task.deleteMany(req.body).then((task) => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(500).send(error);
    })
});

app.listen(3000);