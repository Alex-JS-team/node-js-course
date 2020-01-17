const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userScheme = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  age: {
    type: Number,
    min: 1,
    max: 150
  }
});

const User = mongoose.model("User", userScheme);


module.exports = User;
