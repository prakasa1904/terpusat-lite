import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import bodyParser from 'body-parser';
import config from 'config';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import session from 'express-session';
import useragent from 'express-useragent';
import winston from 'winston';

export const dnsPrefetchControl = control => {
  return (req, res, next) => {
    res.setHeader('X-DNS-Prefetch-Control', control);
    next();
  };
};

export default ({ app, express }) => {
  const __PROD__ = config.isProd;
  const RedisStore = connectRedis(session);

  const sessionConfig = {
    store: new RedisStore(config.redis.session),
    secret: config.app.environment.secret,
    resave: false,
    saveUninitialized: true,
    name: 'liteTerpusatSession',
    cookie: { maxAge: config.app.environment.session.maxAge },
  };

  app.use(cookieParser(config.app.environment.secret));
  app.use(session(sessionConfig));
  app.use(useragent.express());

  if (__PROD__) {
    app.set('trust proxy', 1);
    app.disable('x-powered-by');
  } else {
    app.use(morgan('combined'));
  }

  if (!__PROD__) {
    app.use(express.static(pathResolve(appRootDir.get(), './public/static')));
  }

  // Configure Default Logger
  winston.configure({
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: config.pretyLog,
      }),
    ],
    exitOnError: false,
  });

  if (process.env.NODE_ENV === 'production') {
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Rotate, {
      file: `${config.logDir}/${config.logFile}`,
      colorize: false,
      timestamp: true,
      size: process.env.LOG_SIZE || '500m',
      keep: process.env.LOG_KEEP || 5,
      compress: false,
      json: true,
    });
  } else {
    winston.add(winston.transports.File, {
      filename: `${config.logDir}/${config.logFile}`,
      handleExceptions: true,
      json: true,
    });
  }

  app.use(dnsPrefetchControl('on'));
  app.use(favicon(pathResolve(appRootDir.get(), './public/assets/images', 'favicon.ico')));
};
