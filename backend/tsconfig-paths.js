const tsconfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist';
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: tsconfig.compilerOptions.paths,
});

// When path registration is no longer needed
// cleanup(); 