const path = require('path')
const HTML_FILE = path.join(__dirname, 'index.html')

module.exports = function (app) {

    app.route('/')
        .get((req, res) => {
            res.sendFile(HTML_FILE)
        })

    app.route('/users')
        .get((req, res) => {
            res.send("USERS TAI")
            console.log("TAIIII");
        })
};