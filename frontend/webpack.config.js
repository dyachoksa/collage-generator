const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const contentPath = path.join(__dirname, "..", "build", "frontend");

module.exports = {
  entry: {
    main: ["./src/index.tsx"]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.[tj]s(x?)$/,
        exclude: /node_modules\/(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
        use: [
          { loader: "babel-loader", options: { cacheDirectory: true } },
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ["file-loader", "image-webpack-loader"]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: devMode } },
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  output: {
    publicPath: "/",
    path: contentPath,
    filename: devMode ? "[name].js" : "[name].[hash].js",
    chunkFilename: devMode ? "[name].js" : "[name].[hash].js"
  },
  devtool: devMode ? "source-map" : false,
  devServer: {
    allowedHosts: ["localhost", ".collages.local"],
    contentBase: contentPath,
    publicPath: "/",
    historyApiFallback: {
      index: "/index.html"
    },
    hotOnly: true,
    proxy: {
      "/api": "http://localhost:5000",
      "/media": "http://localhost:5000"
    }
  },
  optimization: {
    usedExports: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "."
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[name].css" : "[name].[hash].css"
    }),
    devMode
      ? new webpack.HotModuleReplacementPlugin()
      : new CompressionPlugin({ threshold: 8192 })
  ]
};
