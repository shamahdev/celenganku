import 'regenerator-runtime'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import xss from 'xss-clean'
import cookirParser from 'cookie-parser'

import siswaRoutes from './routes/siswa-routes'
import adminRoutes from './routes/admin-routes'
import AuthController from './controllers/auth-controller'

const app = express()
const HTML_FILE = path.join(__dirname, 'index.html')

app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(cookirParser())

app.use(express.json({
  limit: '15kb',
}))

app.use('/api/siswa', siswaRoutes)
app.use('/api/admin', adminRoutes)
app.get('/token', AuthController.requireAuth, AuthController.retrieveToken)
app.use('/logout', AuthController.logout)

app.use(bodyParser.json())
app.use(express.static(__dirname))
app.use('/', (req, res) => res.sendFile(HTML_FILE))

export default app
