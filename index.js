#!/usr/bin/env node
"use strict";

var currentNodeVersion = process.versions.node;
var [majorVersion] = currentNodeVersion.split(".");

if (majorVersion < 12) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "Create Accessible App requires Node 12 or higher. \n" +
      "Please update your version of Node."
  );
  process.exit(1);
}

const { init } = require("./src/createAccessibleApp");

init();
