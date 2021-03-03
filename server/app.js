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

const HTML_FILE = path.join(__dirname, 'index.html')
const app = express()
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
app.get('*', (req, res) => {
  res.redirect('/')
})

export default app
