import 'es6-promise/auto';
import 'isomorphic-fetch';
import 'winston-logrotate';
import config from 'config';
import express from 'express';
import winston from 'winston';
import Loadable from 'react-loadable';

import initMiddleware from './middleware/initialMiddleware';
//import authMiddleware from './middleware/auth';
//import universalRender from './middleware/universal-render';

winston.info('Starting server...');

const __PROD__ = config.isProd;
const app = express(); initMiddleware({ app, express });


console.log('========== __PROD__ ==========')
console.log(__PROD__)
console.log('========== __PROD__ ==========')
//app.use(universalRender);
app.use((req, res, next) => res.end('ok'));

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
