const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./src/content.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx$/, use: "babel-loader"
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: "**/*",
			to: ".",
			ignore: ["*.js"],
			context: "src"
		}])
	]
};