const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminJpegoptim = require("imagemin-jpegoptim");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const base = require("./webpack.base");
const BUILD_DIR = path.resolve(__dirname, "build");

const MiniCssExtractStyles = new MiniCssExtractPlugin({
  filename: "[hash].[name].css",
  chunkFilename: "[id].[hash].css"
});

module.exports = merge(base, {
  devtool: "source-map",
  mode: "production",
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    chunkFilename: "[name].[contenthash].js"
    // filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: "css-loader",
            options: {
              localIdentName: "[name]_[local]__[hash:base64:5]",
              modules: true,
              importLoaders: 1,
              camelCase: true,
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    MiniCssExtractStyles,
    new ManifestPlugin({
      fileName: path.resolve(__dirname, "build", "rev-manifest.json")
    }),
    new ImageminPlugin({
      optipng: null,
      jpegtran: null,
      gifsicle: null,
      pngquant: {
        speed: 2
      },
      svgo: null,
      plugins: [
        ImageminJpegoptim({
          max: 85,
          progressive: true
        })
      ]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ],
    runtimeChunk: "multiple"
  }
});
