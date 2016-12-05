var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: [ 'babel' ],
				exclude: /node_modules/,
				include: __dirname

			},
			{
				test: /(\.scss|\.css)$/,
				loaders: [
					require.resolve('style-loader'),
					require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:3]!postcss-loader',
					require.resolve('sass-loader') + '?sourceMap'
				]
			}
		]
	},
	postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
}
