const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vuebundle: ["vue"],
    utils: ["moment"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "src/static/js"),
    library: "[name]"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true, // 注释debugger
            drop_console: true, // 注释console
            pure_funcs: ["console.log"] // 移除console
          }
        },
        sourceMap: false, // 去除打包后生成的.map文件
        parallel: true
      })
      // new OptimizeCssAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "src/static/js", "[name]-manifest.json")
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new BundleAnalyzerPlugin({
      analyzerPort: "8082"
    })
  ]
};
