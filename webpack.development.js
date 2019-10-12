const path = require("path");
const merge = require("webpack-merge");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const webpack = require("webpack");

const base = require("./webpack.base");
const PORT = process.env.PORT || 3000;

module.exports = merge(base, {
  devtool: "inline-source-map",
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
    "webpack/hot/only-dev-server"
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "build"),
    port: PORT,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader?transpileOnly"],
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "react-hot-loader/webpack",
        include: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              localIdentName: "[folder]_[local]--[hash:base64:5]",
              modules: true,
              importLoaders: 1,
              camelCase: true,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
      // {
      //   test: /node_modules\/(*.)\.s?css$/,
      //   exclude: /src\/(.*)\.scss$/,
      //   use: [
      //     "style-loader&sourceMap",
      //     "css-loader&sourceMap",
      //     "postcss-loader?sourceMap",
      //     "resolve-url-loader?sourceMap",
      //     "sass-loader?sourceMap"
      //   ]
      // }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    namedModules: true
  }
});
