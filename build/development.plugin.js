import config from 'config';

export default (webpack, arrOfPlugins) => {
  if (config.isDevel) {
    arrOfPlugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());
  }
};
