import express from 'express'
import routes from './routes/routes'
import CONFIG from './global/config'

const app = express()

app.use(express.static(CONFIG.DIST_DIR))
routes(app)

app.listen(CONFIG.PORT, () => {
  console.log(`App listening to ${CONFIG.PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
