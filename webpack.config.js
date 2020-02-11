const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './StateMachine.js',
	output: {
		filename: 'StateMachine.min.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
	  rules: [
		{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
	  ]
	}
}