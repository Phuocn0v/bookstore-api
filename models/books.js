const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  author: String,
  rating: Number,
  pages: Number,
  genres: Array
})

const Book = mongoose.model('books', bookSchema)
module.exports = Book
