var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = {

  entry: {
    app: [path.resolve(__dirname, '../src/main.ts')],
    vendor: [
      path.resolve(__dirname, '../node_modules/jquery/dist/jquery.slim.js'),
      path.resolve(__dirname, '../node_modules/tether/dist/js/tether.js'),
      path.resolve(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.js'),
    ]
  },

  output: {
    path: path.resolve(__dirname, '../../server/wwwroot'),
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.ts', '.html'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'state': path.resolve(__dirname, '../src/state'),
      'vue$': 'vue/dist/vue.js'
    }
  },

  module: {
    
    loaders: [
      {
        test: /\.html$/,
        loader: 'vue-html'
      },

      {
        test: /\.ts$/,
        loader: 'babel!ts-loader',
        exclude: /node_modules/
      },
      {
        test: /(jquery\.slim\.js|tether\.js)$/,
        loader: 'script-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url?prefix=img/&limit=5000'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass?sourceMap'
      },

      {
        test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?prefix=font/&limit=5000&mimetype=application/font-woff'
      }
    ]
  },

  babel: {
    plugins: ['transform-runtime'],
    presets: ['es2015']    
  },

  postcss: function() {
    return [autoprefixer];
  }
};
