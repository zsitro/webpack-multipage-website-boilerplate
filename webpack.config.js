// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
	// entry: "./src/coffee/main.coffee",
	entry: {
		common: "./src/coffee/main.coffee",
		home: "./src/coffee/Pages/Home/Home.coffee"
	},
	output: {
		path: "./dist/scripts",
		filename: "application.[name].js"
	},
	resolve: {
		modulesDirectories: ['node_modules', 'bower_components', 'web_modules'],
		alias: {
			// jquery: "jquery/dist/jquery.min.js",
		}
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.coffee$/, loader: "coffee-loader" },
			{ test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
		]
	},
	plugins: [
		// new CommonsChunkPlugin("commons.chunk.js")
	]
};