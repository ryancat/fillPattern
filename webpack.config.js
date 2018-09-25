const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'fillPattern': './src/fillPattern.ts',
    'fillPattern.min': './src/fillPattern.ts'
  },

  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js',
    libraryTarget: 'umd',
    // libraryTarget: 'window',
    library: 'fillPattern',
    umdNamedDefine: true
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  
  devtool: 'inline-source-map',
  
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}