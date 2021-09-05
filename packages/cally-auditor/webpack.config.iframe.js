"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/iframe/index.js",
  output: {
    path: path.join(__dirname, "./lib"),
    filename: "iframe-bundle.js",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            include: [path.resolve(__dirname, "./src")],
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-react"],
              },
            },
          },
          {
            test: /\.js$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            use: {
              loader: "babel-loader",
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: ["@babel/preset-react"],
              },
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // This prevents our bundled Iframe from accidentally hijacking devtools.
      __CALLY_AUDITOR_GLOBAL_HOOK__: "({})",
    }),
  ],
  performance: false,
};
