const express = require('express')
require('body-parser')
require('dotenv').config()

const bookRoute = require('./routes/booksRoute')
const authRoute = require('./routes/authRoute')
const cartRoute = require('./routes/cartRoute')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/book', bookRoute)
app.use('/auth', authRoute)
app.use('/cart', cartRoute)

module.exports = app
