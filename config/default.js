const path = require('path');
const debug = require('debug')('app:config');
const argv = require('yargs').argv;
const pkg = require('../package.json');

debug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
if (!process.env.NODE_ENV) {
  throw new Error('env NODE_ENV not defined');
}

let config = {
  env: process.env.NODE_ENV,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
  version: pkg.version,
  logDir: process.env.LOGDIR || path.resolve(__dirname, '..'),
  logFile: process.env.LOGFILE || 'terpusat-lite.log',
  pretyLog: !!process.env.PRETY_LOG || false,
  isProd: process.env.NODE_ENV === 'production',
  isAlpha: process.env.NODE_ENV === 'alpha',
  isStaging: process.env.NODE_ENV === 'staging',
  isTest: process.env.NODE_ENV === 'test',
  isDevel: process.env.NODE_ENV === 'development',
};
config.app = {
  hostname: process.env.APPHOST || `http://${config.host}:${config.port}`,
  title: 'Terpusat',
  description: 'Informasi Terpusat Indonesia',
  keywords: 'terpusat, indonesia, informasi, alamat, lowongan kerja, aktifitas',
  environment: {
    version: '0.1.1',
    secret: 'salt-terpusat',
    session: {
      maxAge: process.env.EXPIRES || 43200000, // 12 hours
      value: process.env.COOKIE_VALUE || false,
    },
  }
}
config.redis = {
  session: {
    host: 'localhost',
    port: 6379,
    no_ready_check: false,
  }
}
config.build = {
  path: `${config.app.hostname}/assets/`,
}

module.exports = config;
