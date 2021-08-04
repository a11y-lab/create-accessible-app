var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var relative = "../template";

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
    contentBase: path.join(__dirname, "dist"),
    // Enable gzip compression for everything served:
    compress: true,
    // The bundled files will be available in the browser under this path.
    publicPath: "/",
    port: 9000,
    filename: "bundle.js",
  },
  entry: "./template/src/index.jsx",
  // Attempt to resolve these extensions in order
  // if import App from './App', webpack find a file from it. 'App.js', 'App.jsx', 'App.json'
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, relative, "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
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
        include: path.resolve(__dirname, relative, "src"),
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
