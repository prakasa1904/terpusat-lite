import config from 'config';

export default (webpack, arrOfPlugins) => {
  if (config.isProd) {
    const { UglifyJsPlugin } = webpack.optimize;
    const UglifyJsPluginConfig = new UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
      },
    });
    arrOfPlugins.push(UglifyJsPluginConfig);
  }
};
