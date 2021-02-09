import app from './app-dev'
import CONFIG from './global/config'

app.listen(CONFIG.PORT, () => {
  console.log(`App listening to ${CONFIG.PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
