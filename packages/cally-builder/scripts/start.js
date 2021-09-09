#!/usr/bin/env node
process.env.NODE_ENV = "development";

const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../config/webpack.config.dev");
const open = require("open");

function clearConsole() {
  process.stdout.write("\x1B[2J\x1B[0f");
}

// https://webpack.js.org/api/node/
const compiler = webpack(config);

new WebpackDevServer(compiler).listen(9000, "localhost", function (err) {
  if (err) {
    console.log(chalk.red("Failed to run WebpackDevServer."));
    return console.log(err);
  }

  clearConsole();
  console.log(chalk.cyan("Starting the development server..."));
  console.log();
  open("http://localhost:9000/");
});
