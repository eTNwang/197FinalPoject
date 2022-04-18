const mongoose = require('mongoose')

const { Schema, model } = mongoose

// const { Schema, model } = require('mongoose')

const favoriteSchema = new Schema({
  movieid: String,
  user: String,
})

const Favorited = model('favorite', favoriteSchema)

module.exports = Favorited
