const path = require('path');

module.exports = {
  entry: './lib/register.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nacl-did.js'
  }
}