const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')
const { roleRequire } = require('../helper/roleRequire')

router.use(roleRequire)

router.get('/', (req, res) => {
  cartController.getCartByUid(req.user.uid).then((data) => {
    res.status(200).json(data)
  })
})

module.exports = router
