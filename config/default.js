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
  port: process.env.PORT || 5000,
  version: '0.1.1',
  isProd: process.env.NODE_ENV === 'production',
  isAlpha: process.env.NODE_ENV === 'alpha',
  isStaging: process.env.NODE_ENV === 'staging',
  isTest: process.env.NODE_ENV === 'test',
  isDevel: process.env.NODE_ENV === 'development',
};

module.exports = config;
