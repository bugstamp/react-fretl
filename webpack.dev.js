'use strict';

const webpack = require('webpack');
const path = require('path');
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

  devServer: {
    contentBase: PATHS.public,
    inline: true,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js(x)?$/,
      options: {
        eslint: {
          configFile: path.join(__dirname, '.eslintrc'),
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.assets}/template.html`,
      inject: 'body',
      favicon: `${PATHS.assets}/fav-icon.png`,
    }),
    new ExtractTextPlugin('assets/styles/styles.css'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: [
          PATHS.modules,
          PATHS.public,
        ],
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss?$/,
        include: PATHS.styles,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
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
        })),
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
            name: 'fonts/[path][name].[ext]',
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
            name: 'fonts/[path][name].[ext]',
          },
        },
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '*'],
    alias: {
      '../../images': `${PATHS.assets}/images`,
      '../../fonts': `${PATHS.assets}/fonts`,
    },
  },

  devtool: 'cheap-module-eval-source-map',
};
