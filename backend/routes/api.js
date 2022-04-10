const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/questions')

const router = express.Router()

router.get('/questions', async (req, res) => {
  const questions = await Question.find()
  res.json(questions)
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { body } = req
  const { questionText } = body
  await Question.create({ questionText, answer: '', author: req.session.username })
  res.send(`${questionText} was added by ${req.session.username}:`)
})

router.post('/questions/answer', isAuthenticated, async (req, res) => {
  const { body } = req
  const { _id, answer } = body
  await Question.updateOne({ _id }, { $set: { answer } })
  res.send(`question answered by ${req.session.username}`)
})

router.post('/questions/delete', async (req, res) => {
  await Question.deleteMany({})
  res.send(`all questions were successfully deleted`)
})

module.exports = router
