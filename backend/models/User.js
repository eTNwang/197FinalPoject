const mongoose = require('mongoose')

const { Schema, model } = mongoose

// const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  username: { type: String },
  password: { type: String },
})

const User = model('User', userSchema)

module.exports = User
