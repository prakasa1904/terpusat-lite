import 'es6-promise/auto';
import 'isomorphic-fetch';
import 'winston-logrotate';
import config from 'config';
import express from 'express';
import winston from 'winston';
import Loadable from 'react-loadable';

import initMiddleware from './middleware/initialMiddleware';
import universalMiddleware from './middleware/universalMiddleware';

winston.info('Starting server...');

const __PROD__ = config.isProd;
const app = express();
initMiddleware({ app, express });

// Server Routing
app.use(universalMiddleware);

app.use((err, req, res) => {
  console.log(err);

  return res.send(!__PROD__ && err ? err : 'Ooopss.. We could not process request');
});

process.on('SIGINT', () => {
  winston.info('Received SIGINT exiting');
  process.exit();
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  Loadable.preloadAll().then(() => {
    app.listen(config.port, err => {
      if (err) {
        winston.error(err);
      }
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept();
}

export default app;
