require("dotenv").config();

const md5 = require("md5");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const IS_PROD = process.env.NODE_ENV === "production";
const APP_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

module.exports = {
  entry: ["@babel/polyfill", `${APP_DIR}/index.tsx`],
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: "[hash].[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)/i,
        use: ["file-loader?hash=sha512&digest=hex&name=[hash].[ext]"]
      },
      {
        test: /\.svg$/i,
        use: [
          ({ resource }) => ({
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    cleanupIDs: {
                      prefix: {
                        toString() {
                          this.counter = this.counter || 0;

                          return `svg-${md5(
                            path.relative(__dirname, resource)
                          )}-${this.counter++}`;
                        }
                      },
                      minify: true
                    }
                  }
                ]
              }
            }
          })
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".scss"],
    alias: {
      components: path.resolve("./src/components"),
      views: path.resolve("./src/containers"),
      root: path.resolve("./src")
    }
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      // favicon: `${APP_DIR}/assets/favicon.ico`,
      template: `${APP_DIR}/assets/index.html`,
      production: IS_PROD
    })
  ],
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all"
    }
  }
};
