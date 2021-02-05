import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import app from './app'
import config from '../../webpack.dev'
import CONFIG from './global/config'

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler))

app.listen(CONFIG.PORT, () => {
  console.log(`App listening to ${CONFIG.PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
