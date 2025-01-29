/* eslint-disable @typescript-eslint/no-require-imports */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // Other rules...
  plugins: [new NodePolyfillPlugin()],
};
