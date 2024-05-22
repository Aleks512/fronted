const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        }
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
