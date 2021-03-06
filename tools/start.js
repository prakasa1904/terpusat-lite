import path from 'path';
import express from 'express';
import webpack from 'webpack';
import { host, port } from 'config';
import browserSync from 'browser-sync';
import logApplyResult from 'webpack/hot/log-apply-result';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import createLaunchEditorMiddleware from 'react-dev-utils/errorOverlayMiddleware';

import webpackConfig from './../build/webpack.config';
import run, { format } from './run';
import clean from './clean';

const isDebug = !process.argv.includes('--release');

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions = {
  // Watching may not work with NFS and machines in VirtualBox
  // Uncomment next line if it's your case (use true or interval in milliseconds)
  //poll: true,
  // Decrease CPU or memory usage in some file systems
  ignored: /node_modules/,
};

function createCompilationPromise(name, compiler, config) {
  return new Promise((resolve, reject) => {
    let timeStart = new Date();

    compiler.plugin('done', stats => {
      console.info(stats.toString(config.stats));
      const timeEnd = new Date();
      const time = timeEnd.getTime() - timeStart.getTime();
      if (stats.hasErrors()) {
        console.info(`[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`);
        reject(new Error(stats.compilation.errors.map(err => err.message || err)));
      } else {
        console.info(`[${format(timeEnd)}] Finished '${name}' compilation after ${time} ms`);
        resolve(stats);
      }
    });
  });
}

let server;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  if (server) {
    return server;
  }
  server = express();
  server.use(createLaunchEditorMiddleware());
  server.use(express.static(path.resolve(__dirname, '../statics')));

  const [clientConfig, serverConfig] = webpackConfig;

  // Configure compilation
  await run(clean);

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);
  const clientPromise = createCompilationPromise('client', clientCompiler, clientConfig);
  const serverPromise = createCompilationPromise('server', serverCompiler, serverConfig);

  // https://github.com/webpack/webpack-dev-middleware
  server.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      logLevel: 'silent',
      watchOptions,
    }),
  );

  // https://github.com/glenjamin/webpack-hot-middleware
  server.use(webpackHotMiddleware(clientCompiler, { log: false }));

  let appPromise;
  let appPromiseResolve;
  let appPromiseIsResolved = true;

  serverCompiler.plugin('compile', () => {
    if (!appPromiseIsResolved) {
      return;
    }
    appPromiseIsResolved = false;
    appPromise = new Promise(resolve => (appPromiseResolve = resolve));
  });

  let app;

  if (app) {
    server.use((req, res) => {
      appPromise.then(() => app.handle(req, res)).catch(error => console.error(error));
    });
  }

  function checkForUpdate(fromUpdate) {
    if (app.hot.status() === 'idle') {
      return Promise.resolve(() => {
        console.info('[HMR] App is Idle.');
      });
    }

    return app.hot
      .check()
      .then(updatedModules => {
        if (updatedModules) {
          return app.hot.apply().then(renewedModules => {
            logApplyResult(updatedModules, renewedModules);
            checkForUpdate(true);
          });
        }
        if (fromUpdate) {
          return console.info('[HMR] Update applied.');
        }
        return console.warn('[HMR] Cannot find update.');
      })
      .catch(error => {
        if (['abort', 'fail'].includes(app.hot.status())) {
          console.warn('[HMR] Cannot apply update.');
          console.warn('[HMR] Reloading server.js...');
          delete require.cache[require.resolve('../public/server')];
          // eslint-disable-next-line global-require, import/no-unresolved
          app = require('../public/server').default;
          console.warn('[HMR] App has been reloaded.');
        } else {
          console.warn(`[HMR] Update failed: ${error.stack || error.message}`);
        }
      });
  }

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
      checkForUpdate().then(() => {
        appPromiseIsResolved = true;
        appPromiseResolve();
      });
    }
  });

  // Wait until both client-side and server-side bundles are ready
  await clientPromise;
  await serverPromise;

  const timeStart = new Date();
  console.info(`[${format(timeStart)}] Launching server...`);

  // Load compiled src/server.js as a middleware
  // eslint-disable-next-line global-require, import/no-unresolved
  app = require('../public/server').default; // TODO: need to changes to public/server 
  appPromiseIsResolved = true;
  appPromiseResolve();

  // Launch the development server with Browsersync and HMR
  await new Promise((resolve, reject) =>
    browserSync.create().init(
      {
        // https://www.browsersync.io/docs/options
        server: 'src/server.js',
        host: host,
        port: port,
        middleware: [server],
        open: !process.argv.includes('--silent') ? 'external' : false,
        ...(isDebug ? {} : { notify: false, ui: true }),
      },
      (error, bs) => (error ? reject(error) : resolve(bs)),
    ),
  );

  const timeEnd = new Date();
  const time = timeEnd.getTime() - timeStart.getTime();
  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);

  return server;
}

export default start;
