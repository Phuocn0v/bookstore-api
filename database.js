const mongoose = require('mongoose')

function makeDatabase (mongoString) {
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

  return database
}

module.exports = { makeDatabase }
