const fs = require('fs');
const browserify = require('browserify');

const libDir = '../client/lib/';
const distDir = '../client/dist/browser/www/script/';
const commonFile = distDir + 'common.js';

const files = fs.readdirSync(libDir);
const entries = [];
const outputs = [];

files.forEach((file) => {
  entries.push(libDir + file);
  outputs.push(distDir + file);
});

const bundler = browserify({
  entries,
  cache: {},
  packageCache: {},
  debug: true
});

bundler.transform('babelify', {
  presets: ['es2015']
});

bundler.plugin('factor-bundle', {
  outputs
});

bundler.plugin('watchify');

bundler.on('update', () => {
  bundler
    .bundle()
    .on('error', (error) => {
      console.log(error.message);
    })
    .pipe(fs.createWriteStream(commonFile));
});

bundler.on('log', (message) => {
  console.log(message);
});

bundler.emit('update');
