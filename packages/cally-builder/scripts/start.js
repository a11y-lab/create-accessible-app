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
const compiler = webpack(config, (err, stats) => {
  clearConsole();
  // [Stats Object](#stats-object)
  if (err || stats.hasErrors()) {
    // [Handle errors here](#error-handling)
    console.log(chalk.red("Failed to compile."));
    return;
  }
  // Done processing
  console.log(chalk.green("Compiled successfully!"));
  console.log();
  console.log("The app is running at http://localhost:9000/");
  console.log();
});

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
