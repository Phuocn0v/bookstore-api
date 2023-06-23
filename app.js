const express = require('express')
const mongoose = require('mongoose')
require('body-parser')
require('dotenv').config()

const bookRoute = require('./routes/booksRoute')
const authRoute = require('./routes/authRoute')
const bodyParser = require('body-parser')

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString).catch((error) => {
  console.log(error)
})
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected')
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/book', bookRoute)
app.use('/auth', authRoute)

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
