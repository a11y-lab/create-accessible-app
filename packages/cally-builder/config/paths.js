const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => {
  return path.resolve(appDirectory, relativePath);
};
const resolveOwn = (relativePath) => {
  return path.resolve(__dirname, relativePath);
};

// When scripts are running in ./node_modules/cally-builder/config/ of created app.
module.exports = {
  appDist: resolveApp("dist"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.jsx"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appNodeModules: resolveApp("node_modules"),
};

// When scripts are running in: ./packages/cally-builder/config/ of cally-builder for testing.
if (__dirname.includes(path.join("packages", "cally-builder", "config"))) {
  module.exports = {
    appDist: resolveOwn("../../../dist"),
    appPublic: resolveOwn("../template/public"),
    appHtml: resolveOwn("../template/public/index.html"),
    appIndexJs: resolveOwn("../template/src/index.jsx"),
    appPackageJson: resolveOwn("../package.json"),
    appSrc: resolveOwn("../template/src"),
    appNodeModules: resolveOwn("../node_modules"),
  };
}
