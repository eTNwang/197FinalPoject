const express = require('express')

const User = require('../models/User')
const isAuthenticated = require('../middlewares/isAuthenticated')
const logError = require('../middlewares/logError')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { body } = req
  const { username, password } = body
  try {
    await User.create({ username, password })
    req.session.username = ``
    req.session.password = password
    res.send(`user signup as ${req.session.username} was successful`)
  } catch (e) {
    res.send('user signup was not successful')
  }
})

router.get('/get', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

router.post('/login', logError, (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    User.findOne({ username, password }, (err, user) => {
      try {
        if (!user) {
          res.send('wrong username or password')
        } else if (user) {
          req.session.username = username
          req.session.password = password
          res.send(`succesfully logged in as ${req.session.username}`)
        }
        if (err) {
          next(err)
        }
      } catch (e) {
        next(err)
      }
    })
  } catch (err) {
    res.send('a login error occurred')
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  res.send('user logged out')
})

router.get('/getLoggedIn', (req, res) => {
  if (req.session.username === '') {
    res.send(false)
  } else {
    res.send(true)
  }
})

router.get('/getcurruser', (req, res) => {
  res.send(req.session.username)
})

router.post('/update', async (req, res) => {
  const { body } = req
  const { username, password } = body
  await User.updateOne({ username }, { password })
  res.send('user update was successful')
})

router.post('/delete', async (req, res) => {
  await User.deleteMany({})
  res.send(`all users were successfully deleted`)
})

module.exports = router
