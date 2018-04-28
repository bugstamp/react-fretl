'use strict'

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  assets: path.resolve(__dirname, 'src/assets'),
  styles: path.resolve(__dirname, 'src/assets/styles'),
  modules: path.resolve(__dirname, 'node_modules'),
  public: path.resolve(__dirname, 'public'),
};

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      `${PATHS.src}/index.jsx`,
    ],
  },

  output: {
    filename: 'bundle.js',
    path: PATHS.public,
    publicPath: '/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CleanWebpackPlugin(['public'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new CopyWebpackPlugin([{
      context: 'server/db/api/images/',
      from: '**/*',
      to: 'images/',
    }]),
    new HtmlWebpackPlugin({
      template: `${PATHS.assets}/template.html`,
      inject: 'body',
      favicon: `${PATHS.assets}/fav-icon.png`,
    }),
    new ExtractTextPlugin('assets/styles/styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: [
          PATHS.modules,
          PATHS.public,
        ],
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss?$/,
        include: PATHS.styles,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js',
                },
              },
            },
          ],
          publicPath: '../../',
        }),
      },
      {
        test: /\.(png|jpeg|jpg|gif)?$/,
        include: PATHS.assets,
        use: {
          loader: 'file-loader',
          options: {
            context: 'src/assets/',
            name: 'assets/[path][name].[ext]',
          },
        },
      },
      {
        test: /\.svg$/,
        include: PATHS.assets,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [{
                  cleanupIDs: {
                    prefix: {
                      toString() {
                        this.counter = this.counter || 0;
                        const prefix = `id-${this.counter += 1}`;

                        return prefix;
                      },
                    },
                  },
                }],
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)?$/,
        include: PATHS.assets,
        use: {
          loader: 'file-loader',
          options: {
            context: 'src/assets/',
            name: 'assets/[path][name].[ext]',
          },
        },
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)?$/,
        include: PATHS.modules,
        use: {
          loader: 'file-loader',
          options: {
            context: 'node_modules/',
            name: 'assets/fonts/[path][name].[ext]',
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '*'],
    alias: {
      '../../images': `${PATHS}/images/`,
      '../../fonts': `${PATHS}/fonts/`,
    },
  },
};
