const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('public/index.jsx'),
  appSrc: resolveApp('public'),
  appLib: resolveApp('lib'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
};
