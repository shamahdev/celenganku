const port = process.env.PORT || 8080
const express = require('express')

const app = express()
const routes = require('./routes')

app.use(express.static(__dirname))
routes(app)

app.listen(port, () => {
  console.log(`App listening to ${port}`)
  console.log('Press Ctrl+C to quit.')
})
