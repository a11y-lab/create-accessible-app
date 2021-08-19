const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

// Webpack configuration for development
// Development configuration is focused on easy debugging and fast rebuilds.
module.exports = {
  mode: "development",
  // This makes the bundle appear split into separate modules in the devtools.
  // eval-cheap-source-map option is that even though generating source maps, rebuild speed is fast.
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: "eval-cheap-source-map",
  // Run webpack-dev-server
  devServer: {
    // Tell the server where to serve content from. This is only necessary if you want to serve static files.
    static: {
      directory: paths.appPublic,
    },
    // Enable gzip compression for everything served:
    compress: true,
    port: 9000,
  },
  entry: paths.appIndexJs,
  // Attempt to resolve these extensions in order
  // if import App from './App', webpack find a file from it. 'App.js', 'App.jsx', 'App.json'
  resolve: {
    extensions: [".js", ".jsx", ".json", ""],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: paths.appSrc,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
