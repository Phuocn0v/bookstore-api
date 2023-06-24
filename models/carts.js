const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  user: String,
  items: Array
})

const Cart = mongoose.model('carts', cartSchema)
module.exports = Cart
