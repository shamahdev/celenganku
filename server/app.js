import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import 'regenerator-runtime'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import xss from 'xss-clean'
import cookirParser from 'cookie-parser'
import CONFIG from './global/config'
import config from '../webpack.dev'

import siswaRoutes from './routes/siswa-routes'
import authController from './controllers/auth-controller'

const app = express()
const HTML_FILE = path.join(__dirname, 'index.html')

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))

app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(cookirParser())

app.use(express.json({
  limit: '15kb',
}))
app.use('/api/siswa', siswaRoutes)
app.get('/token', authController.requireAuth, authController.retrieveToken)
app.use('/user', authController.requireAuth)

app.use(bodyParser.json())
app.use(express.static(__dirname))
app.use('/', (req, res) => res.sendFile(HTML_FILE))

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(path.join(CONFIG.DIST_DIR, 'index.html'), (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

export default app
