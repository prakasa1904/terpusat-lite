module.exports = {
  PORT: process.env.PORT || 5000,
  __DEV__: process.env.NODE_ENV === 'development',
  __TEST__: process.env.NODE_ENV === 'test',
  __PROD__: process.env.NODE_ENV === 'production',
}