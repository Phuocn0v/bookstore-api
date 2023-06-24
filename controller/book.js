const db = require('../models')
const Books = db.BookModel

async function getAll () {
  const res = await Books.find()
  return res
}

async function getBookById (id) {
  const res = await Books.findById(id)
  return res
}

module.exports = {
  getAll,
  getBookById
}
