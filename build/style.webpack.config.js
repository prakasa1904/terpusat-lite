import path from 'path';
import config from 'config';
import appRootDir from 'app-root-dir';

export default ({ isClient }) => [
  'style-loader',
  {
    loader: `css-loader${isClient ? '' : '/locals'}`,
    options: {
      minimize: !config.isDevel,
      importLoaders: 2,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: path.resolve(appRootDir.get(), './build/helpers/postcss.js'),
      },
    },
  },
  {
    loader: 'less-loader',
    options: {
      paths: [path.resolve(appRootDir.get(), './public/assets/styles'), path.resolve(appRootDir.get(), 'node_modules')],
    },
  },
];
