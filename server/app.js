import 'regenerator-runtime'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import appRoutes from './routes/app-routes'
import siswaRoutes from './routes/siswa-routes'
import adminRoutes from './routes/admin-routes'
import transactionRoutes from './routes/transaction-routes'

const app = express()
const HTML_FILE = path.join(__dirname, 'index.html')

app.use(cors())
app.options('*', cors())
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

export default app
