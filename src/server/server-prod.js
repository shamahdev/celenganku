const port = process.env.PORT || 8080,
      express = require('express'),
      app = express(),
      routes = require('./routes')

app.use(express.static(__dirname))
routes(app)

app.listen(port, () => {
    console.log(`App listening to ${port}`)
    console.log('Press Ctrl+C to quit.')
})