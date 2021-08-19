const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

// Webpack configuration for development.
// Production configuration is focused on light bundle and fast build.
module.exports = {
  mode: "production",
  // By defaults, use webpack-terser-plugin for optimization.
  optimization: {
    minimize: true,
  },
  entry: paths.appSrc,
  output: {
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    publicPath: "/",
    path: paths.appDist,
  },
  // Attempt to resolve these extensions in order.
  // if import App from './App', webpack find a file from it. 'App.js', 'App.jsx', 'App.json'.
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
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
