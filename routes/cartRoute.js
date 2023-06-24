const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')
const bookController = require('../controller/book')
const { roleRequire } = require('../helper/roleRequire')

router.use(roleRequire)

router.get('/', async (req, res) => {
  const cart = await cartController.getCartByUid(req.user.uid)

  async function getBookInfo () {
    return await Promise.all(cart.items.map(async (item) => {
      const book = await bookController.getBookById(item.bookId)
      return {
        ...item,
        bookDetail: book
      }
    }))
  }
  await getBookInfo().then((data) => {
    res.status(200).json({ cart: data })
  })
})

module.exports = router
