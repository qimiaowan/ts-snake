const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin
const { merge } = require('webpack-merge')
const dev = require('./webpack.dev')

let config = {
  entry: {
    "index": path.resolve(__dirname, 'src/index.ts')
  },
  output: {
    filename: "js/[name]-[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
        {
					test:  /\.ts$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader'
						},
						{
							loader: 'ts-loader'
						}
					]
				},
        {
          test: /\.css$/i,
            use: [
              {
                loader: 'style-loader',
                options: {
                  insert: 'head'
                }
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader'
              }
            ]      
          },
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')] }),
  ]
}

module.exports = (_, argv)=>{
  if(argv.mode === 'development'){
    return merge(config, dev)
  } else {
    return config
  }
}