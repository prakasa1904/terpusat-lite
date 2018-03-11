import path from 'path';
import config from 'config';
import webpack from 'webpack';
import appRootDir from 'app-root-dir';

import pkg from './../package.json';
import { ifElse } from '../src/helpers';
import progressHandler from './helpers/progress';
import serverWebpackConfig from './server.webpack.config';
import clientWebpackConfig from './client.webpack.config';
import styleConfig from './style.webpack.config';

const isDev = config.isDevel;
const isProd = config.isProd;
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

const ifDev = ifElse(isDev);
const ifProd = ifElse(isProd);
const ifAnalyze = ifElse(isAnalyze);

const mainConfig = ({ isClient }) => ({
  mode: config.env,
  output: {
    publicPath: config.build.path,
    pathinfo: isVerbose,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
    symlinks: false,
    cacheWithContext: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: isDev,
              babelrc: false,
              presets: [
                [
                  'env',
                  {
                    targets: {
                      ...(!isClient
                        ? { node: pkg.engines.node.match(/(\d+\.?)+/)[0] }
                        : { browsers: pkg.browserslist }),
                    },
                    modules: false,
                    useBuiltIns: true,
                  },
                ],
                'stage-0',
                'react',
                ...ifProd(['react-optimize'], []),
              ],
              plugins: [
                'transform-decorators-legacy',
                'react-loadable/babel',
                'babel-plugin-lodash',
                'emotion',
                ...ifDev(['transform-react-jsx-self', 'transform-react-jsx-source'], []),
                ...ifDev(isClient ? ['react-hot-loader/babel'] : [], []),
              ],
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              emitFile: isClient,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 1024,
              name: ifDev('[name].[ext]', '[hash:8].[ext]'),
              emitFile: isClient,
            },
          },
        ],
      },
      // Exclude dev modules from production build
      ...ifProd(
        [
          {
            test: path.resolve(appRootDir.get(), './node_modules/react-deep-force-update/lib/index.js'),
            use: 'null-loader',
          },
        ],
        [],
      ),
    ],
  },
  plugins: [
    new webpack.ProgressPlugin({ handler: progressHandler }),
    new webpack.DefinePlugin({
      globals: JSON.stringify(config),
    }),
  ],
  bail: isProd,
  stats: 'minimal',
});

const pushIntoWebpackConfig = {
  path,
  appRootDir,
  webpack,
  ifDev,
  ifProd,
  ifAnalyze,
  isDev,
  isProd,
  isAnalyze,
  isVerbose,
  mainConfig,
  styleConfig,
};

const configs = [
  clientWebpackConfig(pushIntoWebpackConfig), 
  serverWebpackConfig(pushIntoWebpackConfig)
];

export default configs;
