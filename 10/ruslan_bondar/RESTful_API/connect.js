const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

module.exports = {
    connect,
    mongoose
}