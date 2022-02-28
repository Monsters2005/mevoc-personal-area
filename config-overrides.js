const { addWebpackAlias, override } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['@styles']: path.resolve(__dirname, 'src/styles'),
  })
);
