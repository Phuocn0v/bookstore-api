const db = require('../models')
const Cart = db.CartModel

async function getAll () {
  const res = await Cart.find()
  return res
}

async function checkExist (uid) {
  // Check if user already has a cart
  const res = await Cart.find({ uid })
  if (res.length > 0) return false
  return true
}

async function create (data) {
  const { uid, items } = data
  // Check if user already has a cart
  // If not, create a new cart
  const isValid = await checkExist(uid)
  if (!isValid) return false
  else {
    const cart = new Cart({
      uid,
      items
    })
    cart.save()
    return true
  }
}

async function getCartByUid (uid) {
  const res = await Cart.findOne({ uid })
  if (!res) {
    const cart = new Cart({
      uid,
      items: []
    })
    cart.save()
    return cart
  }
  return res
}

async function addItem (uid, item) {
  const res = await Cart.updateOne({ uid }, { $push: { items: item } })
  return res
}

async function removeItem (uid, item) {
  const res = await Cart.updateOne({ uid }, { $pull: { items: item } })
  return res
}

async function updateNumber (uid, item) {
  const { bookId, number } = item
  const cart = await Cart.findOne({ uid })
  cart.items.forEach((item) => {
    if (item.bookId === bookId) {
      item.number = number
    }
  })
  cart.save()
  return cart
}

module.exports = {
  getAll,
  create,
  getCartByUid,
  addItem,
  removeItem,
  updateNumber
}
