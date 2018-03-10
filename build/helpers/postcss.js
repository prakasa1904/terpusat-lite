const path = require('path');

module.exports = {
  plugins: {
    'postcss-cssnext': { features: { rem: { html: false } } },
    'postcss-import': {
      addModulesDirectories: [
        path.resolve(__dirname, '../node_modules')
      ],
      root: path.resolve(__dirname, '../src/styles/')
    },
    'postcss-modules-values': {},
    'postcss-flexbugs-fixes': {},
  },
};
