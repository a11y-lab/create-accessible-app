"use strict";

const chalk = require("chalk");
const commander = require("commander");
const fs = require("fs");
const path = require("path");
const spawn = require("cross-spawn");
const packageInfo = require("../package.json");

const version = "0.0.11";

const install = (packageToInstall, callback) => {
  const args = ["install", "--save-dev", "--save-exact", packageToInstall];

  const child = spawn("npm", args, { stdio: "inherit" });
  child.on("close", function (code) {
    callback(code, "npm", args);
  });
};

const getInstaller = () => {
  const packageToInstall = "@a11y-lab/cally-builder";
  return packageToInstall + "@" + version;
};

const init = async () => {
  const program = new commander.Command(packageInfo.name);

  program
    .version(packageInfo.version)
    .arguments("[project-directory]")
    .usage(`${chalk.white("<project-directory>")}`)
    .action((name) => {
      if (!name) {
        console.error("Please specify the project directory:");
        console.log(
          `  ${program.name()} ${chalk.white("<project-directory>")}`
        );
        console.log();
        console.log("For example:");
        console.log(`  ${program.name()} new-app`);
        process.exit(1);
      }
      createApp(name);
    });

  await program.parseAsync(process.argv);
};

const createApp = (name) => {
  if (fs.existsSync(name)) {
    console.log("The directory `" + name + "` already exists..");
    console.log("Try using another directory name.");
    process.exit(1);
  }

  const root = path.resolve(name);
  const appName = path.basename(root);

  console.log("Creating a new app in " + root + ".");
  console.log();

  fs.mkdirSync(root);

  const packageJson = {
    name: appName,
    version: "0.0.1",
    private: true,
  };

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
  process.chdir(root);

  run(root, appName);
};

function run(root, appName) {
  const packageToInstall = getInstaller(version);

  console.log(
    `Installing tool for building an app(${chalk.magenta("cally-builder")}).`
  );
  console.log("It won't take more than a few minutes...");
  console.log();

  install(packageToInstall, (code) => {
    if (code !== 0) {
      console.error("`npm install failed");
      return;
    }

    const scriptsPath = path.resolve(
      process.cwd(),
      "node_modules",
      "@a11y-lab",
      "cally-builder",
      "scripts",
      "init.js"
    );
    const init = require(scriptsPath);
    init(root, appName);
  });
}

module.exports = {
  init,
};
