const path = require('path');

module.exports = { 
  entry: './src/main.ts',
  output: {
    filename: 'honeycomb.view.min.js',
    path: path.resolve(__dirname, 'public', 'js'),
    publicPath: '/public/js', // instead of publicPath: '/build/' 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    devMiddleware: {
        writeToDisk: true,
      },
    compress: true,
    port: 8080
  }
};