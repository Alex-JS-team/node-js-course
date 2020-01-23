const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const config = require('./../config')

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
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  },
  tokens: [{
      token: {
        type: String,
        required: true
      }
  }]

});

userScheme.pre('save', async function f(next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
  next();
});

userScheme.methods.findSimilarTypes = function() {
  return [1,2,3,4,5];
};;

userScheme.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.secret);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userScheme);


module.exports = User;
