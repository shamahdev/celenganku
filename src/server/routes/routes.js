const path = require('path')

const HTML_FILE = path.join(__dirname, 'index.html')

module.exports = function Routes(app) {
  app.route('/')
    .get((req, res) => {
      res.sendFile(HTML_FILE)
    })
  app.route('/test')
    .get((req, res) => {
      res.send('test')
    })
}