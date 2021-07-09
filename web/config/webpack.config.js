const path = require('path');

module.exports = {
  entry: {
  	main: '../src/init.js',
  	constants: '../src/constants.js',
  	envelope_follower_worklet: '../src/envelope_follower_worklet.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  resolve: {
  	modules: ['../config/node_modules']
  },
  mode: 'development',
  devtool: 'eval-source-map'
};