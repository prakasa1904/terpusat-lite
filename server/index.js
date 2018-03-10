import config from 'config';
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackConfig from '../build/webpack.config';

const app = express();

// Serving ~/dist by default. Ideally these files should be served by
// the web server and not the app server, but this helps to demo the
// server in production.
// app.use(express.static(path.resolve('static')));

app.use((err, req, res, next) => {
  next(err);
});

if (!config.port) {
  throw new Error('env PORT is undefined');
}

app.listen(config.port);
console.log(`App is now running at http://localhost:${config.port}.`); // eslint-disable-line no-console
