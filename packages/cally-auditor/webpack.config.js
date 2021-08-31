"use strict";

const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./lib"),
    filename: "index.js",
    library: "CallyAuditorOverlay",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /iframe-bundle\.js$/,
        use: "raw-loader",
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    alias: {
      iframeScript$: path.resolve(__dirname, "./lib/iframe-bundle.js"),
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
    },
  },
  optimization: {
    nodeEnv: false,
  },
  performance: {
    hints: false,
  },
};
