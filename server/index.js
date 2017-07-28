import path from 'path'
import webpack from 'webpack'
import express from 'express'
import {
  __DEV__,
  __TEST__,
  __PROD__,
  PORT
} from './../config'
import webpackConfig from '../build/webpack.config'

const app = express()

if (__DEV__) {
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, { // eslint-disable-line global-require
    publicPath: '/',
    contentBase: path.resolve('dist'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
  }))
  app.use(require('webpack-hot-middleware')(compiler)) // eslint-disable-line global-require

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve('static')))

  // serve the generated service-worker file
  app.get('/service-worker.js', (req, res) => {
    res.sendFile(`${path.resolve('dist')}/service-worker.js`)
  })
} else {
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve('static')))
}

app.use((err, req, res, next) => {
  next(err)
})

if (!PORT) {
  throw new Error('env PORT is undefined')
}

app.listen(PORT)
console.log(`App is now running at http://localhost:${PORT}.`) // eslint-disable-line no-console