const db = require("../models");
const Books = db.BookModel;

async function getAll() {
  const res = await Books.find()
  console.log(res)
  return res
}

module.exports = {
  getAll
};