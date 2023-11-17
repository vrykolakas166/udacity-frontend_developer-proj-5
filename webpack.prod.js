const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const path = require("path");

module.exports = {
  entry: {
    index: "./src/client/index.js",
    feeds: "./src/client/js/views/feeds.js",
    details: "./src/client/js/views/details.js",
    saves: "./src/client/js/views/saves.js",
    common: "./src/client/js/views/common/common.js",
  },
  mode: "production",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/",
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CSSMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
      chunks: ["index", "common"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./pages/feeds.html",
      chunks: ["feeds", "common"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./pages/details.html",
      chunks: ["details", "common"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./pages/saves.html",
      chunks: ["saves", "common"],
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
};
