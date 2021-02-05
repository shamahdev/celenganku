import 'regenerator-runtime'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

import siswaRoutes from './routes/siswaRoutes'
import AppError from './utils/appError'

const app = express()
const HTML_FILE = path.join(__dirname, 'index.html')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname))
app.use('/api/siswa', siswaRoutes)
app.use('/', (req, res) => {
  res.sendFile(HTML_FILE)
})
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route')
  next(err, req, res, next)
})
export default app
