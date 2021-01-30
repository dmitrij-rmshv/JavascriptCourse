const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode:'development',
	entry: './js/main.js',
    output:{
        filename: "./build.js"
    }
}