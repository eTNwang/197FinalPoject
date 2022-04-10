const express = require('express')

const isAuthenticated = (req, res, next) => {
  if (req.session.username && req.session.username !== '') {
    next()
  } else {
    res.send('you are not authorized to preform this action')
    next()
  }
}

module.exports = isAuthenticated
