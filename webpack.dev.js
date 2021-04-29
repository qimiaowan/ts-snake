const webpack = require("webpack")
module.exports = {
  devServer: {
    port: 9000,
		open: true,
		contentBase: 'dist',
		compress: true,
    hot: true,
  },
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}