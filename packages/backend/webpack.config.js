/* eslint-disable @typescript-eslint/no-require-imports */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  output: {
    filename: 'index.js',
  },
  plugins: [
    new NodePolyfillPlugin({
      additionalAliases: [
        'stream',
        'crypto',
        'os',
        'http',
        'https',
        'path',
        'zlib',
        'fs',
      ],
    }),
  ],
};
