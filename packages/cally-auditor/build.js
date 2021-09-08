const webpack = require("webpack");
const chalk = require("chalk");
const webpackConfig = require("./webpack.config.js");
const iframeWebpackConfig = require("./webpack.config.iframe.js");
const rimraf = require("rimraf");
const chokidar = require("chokidar");

const args = process.argv.slice(2);
const watchMode = args[0] === "--watch" || args[0] === "-w";

function build(config, name, callback) {
  console.log(chalk.cyan("Compiling " + name));
  webpack(config).run((error, stats) => {
    if (error) {
      console.log(chalk.red("Failed to compile."));
      console.log(error.message || error);
      console.log();
    }

    if (stats.compilation.errors.length) {
      console.log(chalk.red("Failed to compile."));
      console.log(stats.toString({ all: false, errors: true }));
    }

    if (stats.compilation.warnings.length) {
      console.log(chalk.yellow("Compiled with warnings."));
      console.log(stats.toString({ all: false, warnings: true }));
    }

    console.log(
      stats.toString({ colors: true, modules: false, version: false })
    );
    console.log();

    callback(stats);
  });
}

function runBuildSteps() {
  build(iframeWebpackConfig, "iframeScript.js", () => {
    build(webpackConfig, "index.js", () => {
      console.log(chalk.bold.green("Compiled successfully!\n\n"));
    });
  });
}

function setupWatch() {
  const watcher = chokidar.watch("./src", {
    ignoreInitial: true,
  });

  watcher.on("change", runBuildSteps);
  watcher.on("add", runBuildSteps);

  watcher.on("ready", () => {
    runBuildSteps();
  });

  process.on("SIGINT", function () {
    watcher.close();
    process.exit(0);
  });

  watcher.on("error", (error) => {
    console.error("Watcher failure", error);
    process.exit(1);
  });
}

// Clean up lib folder
rimraf("lib/", () => {
  console.log("Cleaned up the lib folder.\n");
  watchMode ? setupWatch() : runBuildSteps();
});
