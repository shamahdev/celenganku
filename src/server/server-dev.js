import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev'
import routes from './routes/routes'
import CONFIG from './global/config'

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(CONFIG.DIST_DIR))
routes(app)

app.listen(CONFIG.PORT, () => {
  console.log(`App listening to ${CONFIG.PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
