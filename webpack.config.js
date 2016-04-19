var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Beautiful example for loading modules & shimming
// https://github.com/webpack/webpack/issues/192

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/app\/lib/, /node_modules/],
        loader: 'ng-annotate!babel'
      },
      {test: /\.html$/, loader: 'raw'},
      {
        test: /\.(sass|scss)$/,
        loaders: ['style', 'css', 'sass']
      },
      {test: /\.css$/, loader: 'style!css'},
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "./client/app"),
      path.resolve(__dirname, "./node_modules/foundation-apps/scss"),
      path.resolve(__dirname, "./node_modules/font-awesome/scss")
    ]
  },
  resolve: {
    alias: {
      //angular: path.resolve(__dirname, './node_modules/angular/angular.js')
      //jquery: path.resolve(__dirname, './node_modules/jquery/dist/jquery.js')
      //underscore: path.resolve(__dirname, './node_modules/underscore/underscore.js')
      //restangular: path.resolve(__dirname, './node_modules/restangular/dist/restangular.js')
    }
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    }),

    // Load these guys automatically into each module
    new webpack.ProvidePlugin({
      _: 'lodash',
      //$: 'jquery',
      //jQuery: 'jquery'
    })
  ]
};



