import 'regenerator-runtime'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from '../webpack.dev'
import CONFIG from './global/config'
import appRoutes from './routes/app-routes'
import siswaRoutes from './routes/siswa-routes'
import adminRoutes from './routes/admin-routes'
import transactionRoutes from './routes/transaction-routes'

const app = express()
const HTML_FILE = path.join(__dirname, 'index.html')

app.use(cors())
app.options('*', cors())

//
//
// Webpack Middleware
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))
// Webpack Middleware
//
//
app.use(cookieParser())
app.use(express.json({
  limit: '15kb',
}))
app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use('/api', appRoutes)
app.use('/api/siswa', siswaRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/transaction', transactionRoutes)
app.use(express.static(__dirname))
app.use('/', (req, res) => res.sendFile(HTML_FILE))

//
//
// Webpack Middleware
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
// Webpack Middleware
//
//

export default app
