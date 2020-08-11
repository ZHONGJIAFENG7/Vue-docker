const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const cdnMap = {
  css: [],
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/element-ui/2.6.1/index.js"
    // "https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js",
    // "https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js",
    // "https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"
  ]
};
module.exports = smp.wrap({
  mode: "production",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    port: 8081,
    // host: '0.0.0.0',
    contentBase: "./src",
    publicPath: "/build/",
    overlay: {
      errors: true // 编译过程中如果有任何错误，都会显示到页面上
    },
    open: false, // 自动帮你打开浏览器
    hot: true
  },
  entry: {
    home: path.resolve(__dirname, "./src/home/main.js")
    // about: path.resolve(__dirname, "./src/about/main.js")
    // 'others': path.resolve(__dirname, './src/others/main.js'),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/build/",
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].bunlde.js",
    libraryTarget: "umd",
    library: {
      root: "myDemo",
      amd: "my-demo",
      commonjs: "my-common-demo"
    }
  },
  resolve: {
    // alias: {
    //   lodash: "lodash-es"
    // },
    extensions: [".js", ".vue", ".json"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  externals: {
    jquery: "jQuery"
    // lodash: {
    //   commonjs: "lodash",
    //   commonjs2: "lodash",
    //   amd: "lodash",
    //   root: "_"
    // }
    // lodash: "_"
    // vue: "Vue",
    // "element-ui": "ELEMENT"
    //将需要忽略打包的都写在这个里面，但前提是index.html文件里面必须script引入
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 3000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 5000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    }
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'assets/css/styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
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
      }),
      new OptimizeCssAssetsPlugin({})
      // (compiler) => {
      //   console.log('compiler', compiler);
      //   new OptimizeCssAssetsPlugin({}).apply(compiler);
      // }
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        default: false,
        vendors: false,
        default: {
          minChunks: 3,
          priority: 10,
          reuseExistingChunk: true
          // name: "commons"
        },
        // elementUI: {
        //   name: "chunk-elementUI", // split vantUI into a single package
        //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
        //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        // },
        avueUI: {
          name: "chunk-avueUI",
          priority: 20,
          test: /[\\/]node_modules[\\/]_@smallwei_avue(.*)/,
          reuseExistingChunk: true,
          enforce: true
        },
        elementUI: {
          name: "chunk-elementUI",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          reuseExistingChunk: true,
          enforce: true
        },
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial"
          // minChunks: 2,
          // name(module, chunks, cacheGroupKey) {
          //   // get the name. E.g. node_modules/packageName/not/this/part.js
          //   // or node_modules/packageName
          //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

          //   // npm package names are URL-safe, but some servers don't like @ symbols
          //   return `npm.${packageName.replace('@', '')}`;
          // },
        }
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
      }
    }
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     minSize: 0,
  //   },
  //   cacheGroups: {
  //     commons: {
  //       chunks: "initial",
  //       minChunks: 2,
  //       maxInitialRequests: 5, // The default limit is too small to showcase the effect
  //       minSize: 0 // This is example is too small to create commons chunks
  //     },
  //     vendorPageA: {
  //       chunks: "initial",
  //       name: "vendor-pageA",
  //       enforce: true,
  //     },
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // {
          //   loader: "style-loader",
          //   options: {
          //     injectType: "styleTag",
          //     insert: element => {
          //       var parent = document.querySelector("head");
          //       parent.append(element);
          //       console.log(element);
          //     },
          //     attributes: {
          //       id: "id"
          //     },
          //     base: 1000
          //   }
          // },
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: "css-loader",
            options: {
              url: (url, resourcePath) => {
                // resourcePath - path to css file

                console.log("url", url);
                console.log("resourcePath", resourcePath);

                // Don't handle `img.png` urls
                // if (url.includes("2.png")) {
                //   return false;
                // }

                return true;
              },
              modules: {
                mode: "local",
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              },
              importLoaders: 0,
              // import: false
              import: (parsedImport, resourcePath) => {
                // parsedImport.url - url of `@import`
                // parsedImport.media - media query of `@import`
                // resourcePath - path to css file

                console.log("parsedImport", parsedImport);
                console.log("resourcePath", resourcePath);

                // Don't handle `style.css` import
                if (parsedImport.url.includes("font.css")) {
                  return true;
                }

                return true;
              },
              // sourceMap: true,
              // onlyLocals: true,
              localsConvention: "camelCase"
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        include: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: false
            }
          }
        ]
      },
      {
        // 添加这个json，解决如上的报错问题
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/
        // include: [
        //   path.resolve("node_modules/element-ui/packages"),
        //   path.resolve("node_modules/element-ui/src")
        // ]
      },
      {
        test: /\.ts$/i,
        use: "ts-loader"
      },
      {
        test: /\.vue$/i,
        use: "vue-loader"
      },
      {
        test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4048,
              mimetype: "image/png",
              fallback: {
                loader: "file-loader",
                options: {
                  // name: '[path][name].[ext]',
                  name(file) {
                    // if (process.env.NODE_ENV === 'dev') {
                    //   return '[name].[ext]';
                    // }
                    console.log("file", file);
                    return "[name].[ext]";
                  },
                  outputPath: "assets/images"
                  // publicPath: "/assets2/"
                  // emitFile: true
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      title: "hello, world",
      minify: {
        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: false,
        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
        //是否对大小写敏感，默认false
        caseSensitive: true,
        //是否移除注释 默认false
        removeComments: true,
        //是否去除空格，默认false
        collapseWhitespace: true,
        //使用短的doctype替代doctype
        useShortDoctype: true,
        //移除空属性
        removeEmptyAttributes: true,
        //保留单例元素的末尾斜杠。
        keepClosingSlash: true
      },
      // 当有多个入口文件, 选择你要使用那些js文件
      // chunks: ['home'],
      // script标签位于html文件的 body 底部
      inject: "body",
      // 给生成的 js 文件一个独特的 hash 值
      hash: false,
      cdnConfig: cdnMap
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./src/static"),
        to: path.resolve(__dirname, "./build/static")
      }
    ]),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash].css",
      chunkFilename: "assets/css/[name].css"
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false,
    //       drop_debugger: true,
    //       drop_console: true
    //     }
    //   },
    //   sourceMap: true,
    //   parallel: true
    // }),
    // new uglify(),
    // new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": devMode ? '"development"' : '"production"',
      test: "666",
      test1: "777",
      test2: {
        name: "123",
        age: 12
      },
      "typeof test3": JSON.stringify("object"),
      test4: JSON.stringify(false)
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: require("./src/static/js/utils-manifest.json")
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: require("./src/static/js/vuebundle-manifest.json")
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: "8082"
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    // new LodashModuleReplacementPlugin({
    //   path: true,
    //   flattening: true
    // })
  ]
});
