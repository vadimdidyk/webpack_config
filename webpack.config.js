const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {

	context: path.resolve(__dirname, 'src'), // Source directory
	entry: './js/main.js', // Input directory/filename
	output: {
		filename: './js/bundle.js', // Output filename
		path: path.resolve(__dirname, 'dist') // Output Directory
	},

	devServer: {
		contentBase: path.resolve(__dirname, 'dist/img'),
		stats: 'errors-only',
		// open: true, // Opens on launch
		port: 3000,
		compress: true // gzip compression
	},

	devtool: 'source-map',

	module: {
		noParse: /jquery|lodash/,
		rules: [
		{
			test: /\.js$/,
			include: /src/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader', options: {presets: ['env']}
			}
		},
		{
			test: /\.html$/,
			use: ['html-loader']
		},
		{
			test: /\.(scss|sass)$/,
			include: [path.resolve(__dirname, 'src', 'css')],
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{loader: 'css-loader', options: {sourceMap: true, minimize: true, url: false}},
					{loader: 'postcss-loader', options: {sourceMap: true}},
					{loader: 'sass-loader', options: {sourceMap: true}}
				]
			})
		},
		{
			test: /\.(jpg|png|gif|svg)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: './img/',
						publicPath: './img/'
					}
				}
			]
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: ['file-loader']
		}
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
    	template: 'index.html'
  	}),
  	new HtmlWebpackPlugin({
  		template: 'second.html',
      filename: 'second.html'
    }),
		new ExtractTextPlugin({
			filename: './css/main.css'
		})
	]
}

module.exports = config;