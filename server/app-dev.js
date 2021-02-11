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
import cookieParser from 'cookie-parser'
import multer from 'multer'
import config from '../webpack.dev'
import CONFIG from './global/config'
import siswaRoutes from './routes/siswa-routes'
import adminRoutes from './routes/admin-routes'
import AuthController from './controllers/auth-controller'

const app = express()
const HTML_FILE = path.join(__dirname, 'index.html')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
})

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

app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(cookieParser())

app.use(express.json({
  limit: '15kb',
}))

app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use('/api/siswa', siswaRoutes)
app.use('/api/admin', adminRoutes)
app.get('/token', AuthController.requireAuth, AuthController.retrieveToken)
app.post('/upload', upload.single('avatar'), AuthController.uploadFile)
app.post('/delete', AuthController.deleteFile)
app.use('/logout', AuthController.logout)

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
