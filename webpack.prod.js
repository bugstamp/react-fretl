'use strict'

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const apiUrl = 'http://localhost:3000';

module.exports = {
	entry: {
		'app': [
			'babel-polyfill', 
			path.resolve(__dirname, 'src/index.jsx')
		]
	},

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/'
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 
				NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify(apiUrl),
			}
		}),
		new CleanWebpackPlugin(['public'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new CopyWebpackPlugin([{
				context: 'server/db/api/images/',
				from: '**/*',
				to: 'images/'
			}]),
		new HtmlWebpackPlugin({
			template: './src/assets/template.html',
			inject: 'body',
			favicon: './src/assets/fav-icon.png',
		}),
		new ExtractTextPlugin('assets/styles/styles.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: { 
				warnings: false 
			}
		})
	],

	module: {
		rules: [
			{
        test: /\.js(x)?$/,
				exclude: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'public')
				],
        use: 'babel-loader'
			},
      {
				test: /\.s[ac]ss?$/,
				include: path.resolve(__dirname, 'src/assets/styles'),
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						'sass-loader', 
						'postcss-loader'
					],
					publicPath: '../../'
				}),
			}, 
			{
				test: /\.(png|jpeg|jpg|gif)?$/,
				include: path.resolve(__dirname, 'src/assets'),
				use: {
					loader: 'file-loader',
					options: {
						context: 'src/assets/',
						name: 'assets/[path][name].[ext]'
					}
				}
			},
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/assets/'),
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

                        return `id-${this.counter++}`;
                      }
                    }
                  }
                }],
              }
            }
          },
        ],
      },
	    { 
	    	test: /\.(ttf|eot|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	    	exclude: path.resolve(__dirname, 'node_modules'),
	    	use: {
	    		loader: 'file-loader',
		    	options: {
		    		context: 'src/assets/',
		    		name: 'assets/[path][name].[ext]'
		    	}
		    }
	    },
	    { 
	    	test: /\.(ttf|eot|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	    	include: path.resolve(__dirname, 'node_modules'),
	    	use: {
	    		loader: 'file-loader',
		    	options: {
		    		context: 'node_modules/',
		    		name: 'assets/fonts/[path][name].[ext]'
		    	}
		    }
	    }
		]
	},

	resolve: {
    extensions: ['.js', '.jsx', '.json', '*'],
    alias: {
    	'../../images': path.resolve(__dirname, 'src/assets/images/'),
    	'../../fonts': path.resolve(__dirname, 'src/assets/fonts/'), 
    }
	}
};