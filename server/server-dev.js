import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import config from '../webpack.dev'
import app from './app'
import CONFIG from './global/config'

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))

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

app.listen(CONFIG.PORT, () => {
  console.log(`App listening to ${CONFIG.PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
