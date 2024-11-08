import path from 'path';
import PugPlugin from 'pug-plugin';

export default {
  entry: './src/index.js',
  output: {
    filename: 'index.[contenthash:8].js',
    path: path.resolve('./build'),
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
    watchFiles: path.resolve('./src'),
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
