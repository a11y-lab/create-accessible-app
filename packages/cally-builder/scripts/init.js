#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const spawn = require("cross-spawn");

module.exports = function (appPath, appName) {
  const builderPath = path.join(
    appPath,
    "node_modules",
    "@a11y-lab",
    "cally-builder"
  );

  const appPackage = require(path.join(appPath, "package.json"));

  // Copy over dependencies of cally-builder
  appPackage.dependencies = appPackage.dependencies || {};
  appPackage.devDependencies = appPackage.devDependencies || {};

  // Setup the script rules
  appPackage.scripts = {
    start: "cally-builder start",
    build: "cally-builder build",
  };

  fs.writeFileSync(
    path.join(appPath, "package.json"),
    JSON.stringify(appPackage, null, 2)
  );

  // Copy over default templates
  fs.copySync(path.join(builderPath, "template"), appPath);

  console.log("Installing react and react-dom from npm...");
  const args = ["install", "--save", "react", "react-dom"];
  const proc = spawn("npm", args, {
    stdio: "inherit",
  });

  proc.on("close", function (code) {
    if (code !== 0) {
      console.error("npm install failed");
      return;
    }

    // Make sure to display the right way to cd
    let cdpath;
    if (path.join(process.cwd(), appName) === appPath) {
      cdpath = appName;
    } else {
      cdpath = appPath;
    }

    console.log("Success! Created " + appName + " at " + appPath + ".");
    console.log();
    console.log("Inside that directory, you can run several commands:");
    console.log("    npm run start");
    console.log("    - Starts the development server.");
    console.log("    npm run build");
    console.log("    - Bundles the app into static files for production.");
    console.log();
    console.log("We suggest that you begin by typing:");
    console.log("  cd", cdpath);
    console.log("  npm run start");
    console.log();
    console.log(
      "- A journey of a thousand miles to achieve web accessibility begins with a single step. -"
    );
  });
};
