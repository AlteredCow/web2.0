const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  context: path.resolve(__dirname, './scripts/src'),
  entry: {
      main: [
          './index.js',
      ]
  },
  output: {
      path: path.resolve(__dirname, './scripts/dist'),
      filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: '/'
  },
  module: {
    rules: [
    {
      test: /\.scss$/,
      include: path.resolve(__dirname, './css/scss'),
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader'})
    },
    {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
    },
    {
     test: /\.jsx?$/,
     loader: 'babel-loader',
     exclude: /node_modules/,
     query: {
         presets: ['es2015']
     }
  }
  ]},
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  watch:true
};
