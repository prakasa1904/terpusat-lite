import CopyWebpackPlugin from 'copy-webpack-plugin';
import NodeExternals from 'webpack-node-externals';

export default ({
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
}) => {
  return {
    ...mainConfig({ isClient: false }),
    name: 'server',
    target: 'node',
    devtool: ifDev(false, 'source-map'),
    performance: false,
    entry: {
      server: [
        path.resolve(appRootDir.get(), './src/server.js')
      ],
    },
    output: {
      ...mainConfig({ isClient: false }).output,
      path: path.resolve(appRootDir.get(), './public/'),
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    module: {
      ...mainConfig({ isClient: false }).module,
      // Override babel-preset-env configuration for Node.js
      rules: mainConfig({ isClient: false }).module.rules.concat([
        {
          test: /\.less$/,
          use: styleConfig({ isClient: false }).slice(1),
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: styleConfig({ isClient: false }).slice(1),
        },
      ]),
    },
    externals: [
      /^\.\/assets\.json$/,
      NodeExternals({
        whitelist: [/\.(css|less|scss|sss)$/i, ...ifProd(['source-map-support/register'], [])],
      }),
    ],
    plugins: [
      ...mainConfig({ isClient: false }).plugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BROWSER': false,
        __DEV__: isDev,
        __PROD__: isProd,
        __CLIENT__: false,
        __SERVER__: true,
        __DEVELOPMENT__: isDev,
        __DISABLE_SSR__: isAnalyze,
        __DEVTOOLS__: isVerbose,
      }),
      // new CopyWebpackPlugin([
      //   {
      //     from: path.resolve(appRootDir.get(), './statics'),
      //     to: path.resolve(appRootDir.get(), './public/assets'),
      //   },
      //   {
      //     from: path.resolve(appRootDir.get(), './src/amp/views'),
      //     to: path.resolve(appRootDir.get(), './public/amp/views'),
      //   }
      // ]),
      ...ifProd([new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })], []),
      ...ifDev(
        [
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
        ],
        [],
      ),
    ],
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
  }
}