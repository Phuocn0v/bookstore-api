const { makeDatabase } = require('./database')
const app = require('./app')

makeDatabase(process.env.DATABASE_URL)

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
