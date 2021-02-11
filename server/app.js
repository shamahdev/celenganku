import 'regenerator-runtime'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
// import xss from 'xss-clean'
import cookieParser from 'cookie-parser'
import multer from 'multer'
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

app.use(cors())
app.use(helmet())
// app.use(xss())
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

export default app
