#!/usr/bin/env node
process.env.NODE_ENV = "production";

const webpack = require("webpack");
const fs = require("fs-extra");
const config = require("../config/webpack.config.prod");
const paths = require("../config/paths");

const copyPublicFolder = () => {
  fs.copySync(paths.appPublic, paths.appDist, {
    dereference: true,
    filter: (file) => file !== paths.appHtml,
  });
};

webpack(config).run(function (err) {
  if (err) {
    console.error("Failed to create a production build. Reason:");
    console.error(err.message || err);
    process.exit(1);
  }

  const openCommand = process.platform === "win32" ? "start" : "open";
  console.log("Successfully generated a bundle in the build folder!");
  console.log();
  console.log("You can now serve it with any static server, for example:");
  console.log("  cd dist");
  console.log("  npm install -g http-server");
  console.log("  hs");
  console.log("  " + openCommand + " http://localhost:8080");
  console.log();
  console.log(
    "The bundle is optimized and ready to be deployed to production."
  );
});

copyPublicFolder();
