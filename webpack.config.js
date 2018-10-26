const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        'sass-loader'
        ]
      })
    }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin('style.css')
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }

}
