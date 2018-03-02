'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 

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

	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		inline: true,
		hotOnly: true,
		historyApiFallback: true,
		proxy: {
			"/api": 'http://localhost:3000'
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 
				NODE_ENV: JSON.stringify('development'),
			}
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.js(x)?$/, 
			options: {
				eslint: {
					configFile: path.join(__dirname, '.eslintrc')
				}
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/assets/template.html',
			inject: 'body',
			favicon: './src/assets/fav-icon.png',
		}),
		new ExtractTextPlugin('assets/styles/styles.css'),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				exclude: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'public')
				],
				use: [ 
					'babel-loader', 
					{
						loader: 'eslint-loader',
						options: { 
							fix: true
						}
					}
				]
			},
			{
				test: /\.(html)$/,
				use: ['html-loader']
			},
			{
	      test: /\.css?$/,
	      use: ['style-loader' ,'css-loader']
	    }, 
	    {
				test: /\.s[ac]ss?$/,
				include: path.resolve(__dirname, 'src/assets/styles'),
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
            'resolve-url-loader',
            'sass-loader',
						'postcss-loader',	
					],
					publicPath: '../../'
				}))
			},
			{
				test: /\.(png|jpeg|jpg|gif)?$/,
				include: path.resolve(__dirname, 'src/assets/'),
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
		    		name: 'fonts/[path][name].[ext]'
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
		    		name: 'fonts/[path][name].[ext]'
		    	}
		    }
	    },
	  ]
	},
	
	resolve: {
		modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '*'],
    alias: {
    	'../../images': path.resolve(__dirname, 'src/assets/images/'),
    	'../../fonts': path.resolve(__dirname, 'src/assets/fonts/'), 
    }
	},
    
	devtool: 'cheap-module-eval-source-map'
};