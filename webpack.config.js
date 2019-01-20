const path = require('path');

module.exports = {
  entry: './src/register.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nacl-did.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
}
