const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Favorited = require('../models/favorited')

const router = express.Router()

router.get('/', async (req, res) => {
  const favorites = await Favorited.find()
  res.json(favorites)
})

router.get('/getfavorite', async (req, res) => {
  const { body } = req
  const { user } = body
  const favorites = await Favorited.find({ user })
  res.json(favorites)
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { body } = req
  const { movieid } = body
  await Favorited.create({ movieid, user: req.session.username })
  res.send(`${movieid} was added by ${req.session.username}:`)})

router.post('/delete', async (req, res) => {
  await Favorited.deleteMany({})
  res.send(`all questions were successfully deleted`)
})

module.exports = router
