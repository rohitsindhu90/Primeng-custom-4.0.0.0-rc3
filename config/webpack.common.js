var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');

module.exports = {
    entry: {
        'polyfills': './showcase/polyfills.ts',
        'vendor': './showcase/vendor.ts',
        'app': './showcase/main.ts'
    },

    resolve: {
      extensions: ['.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader']
            },
            { // for third-party minified scripts, don't process require()
               test: /\.min\.js$/,
               include: /(node_modules|bower_components)/,
               loader: 'script-loader'
           },
          //  { // for third-party minified scripts, don't process require()
          //     test: /\.js$/,
          //     include: /(node_modules|bower_components)/,
          //     loader: 'script-loader'
          // },
        ]
    },
  
    plugins: [
        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
          path.resolve(__dirname, '../src')
        ),

        new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
          template: 'index.html'
        }),
          new webpack.IgnorePlugin(/cptable/)
    ],
    node: {
      fs: "empty"
  },
  externals: [
      {  "./cptable": "var cptable",  "./jszip": "jszip" }
  ]
};
