const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash:8][ext]',
        },
      },
    ],
  },
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    compress: true,
    open: true,
  },
  plugins: [
    new PugPlugin({
      entry: {
        index: 'src/index.pug',
      },
      js: {
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],
};
