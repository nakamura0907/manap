const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const BUILD_ROOT = path.join(__dirname, "/dist");
const SRC_ROOT = path.join(__dirname, "/src");

module.exports = {
  context: SRC_ROOT,
  target: "node",
  entry: path.resolve("src/frameworks/webserver", "index.ts"),
  externals: [nodeExternals()],
  output: {
    filename: "index.js",
    path: BUILD_ROOT,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.join(__dirname, "/src/"),
      "@test": path.join(__dirname, "/__test__/"),
      "@config": path.join(__dirname, "/src/config/"),
      "@features": path.join(__dirname, "/src/features/"),
      "@frameworks": path.join(__dirname, "/src/frameworks/"),
      "@util": path.join(__dirname, "/src/util/"),
      "@common": path.join(__dirname, "/../common/"),
    },
  },
};
