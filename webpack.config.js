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
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
}