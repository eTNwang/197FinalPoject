const mongoose = require('mongoose')

const { Schema, model } = mongoose

// const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  questionText: String,
  answer: String,
  author: String,
})

const Question = model('question', questionSchema)

module.exports = Question
