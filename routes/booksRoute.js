const express = require("express");
const router = express.Router();
const bookController = require('../controller/book');

router.get('/', (req, res)=> {
  bookController.getAll().then((data=> {
    res.status(200).json(data)
  }))
})

module.exports = router;
