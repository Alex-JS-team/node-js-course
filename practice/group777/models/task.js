const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskScheme = new Schema({
  title: String,
  status: Boolean
});

const Task = mongoose.model("Task", taskScheme);


module.exports = Task;