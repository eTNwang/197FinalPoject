const express = require('express')

const logError = (err, req, res, next) => {
  next(err)
}

module.exports = logError
