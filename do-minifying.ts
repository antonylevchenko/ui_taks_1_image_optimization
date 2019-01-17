
express = require('express');
path = require('path');
fs = require('fs');
im = require('imagemagick');

const appPath = path.join(__dirname, '../images-app/');

const imagesFolderPath = appPath + 'data\\images\\';
const minifiedImagesPath = imagesFolderPath + 'minified\\';
const normalImagesPath = imagesFolderPath + 'normal\\';

const existingNormalFiles = [];


fs.readdirSync(normalImagesPath).forEach(file => {
  existingNormalFiles.push(file);
});

const existingMinifiedFiles = [];

fs.readdirSync(minifiedImagesPath).forEach(file => {
  existingMinifiedFiles.push(file);
});

console.log('Existing normal files:');
console.log(existingNormalFiles);
console.log('Existing minified files:');
console.log(existingMinifiedFiles);

const filesToMinify = [];

existingNormalFiles.forEach(file => {
  if (existingMinifiedFiles.indexOf(file) === -1) {
    filesToMinify.push(file);
  }
});
console.log('Files to minify:');
console.log(filesToMinify);
console.log('Minifying...');

filesToMinify.forEach(fileName => {
  const normalFilePath = normalImagesPath + fileName;
  const minifiedFilePath = minifiedImagesPath + fileName;
  console.log(String(minifiedFilePath));
  const options = {
    srcPath: String(normalFilePath),
    dstPath: minifiedFilePath,
    width: 200,
    strip: true
  };
  console.log(options);

  im.resize(options, function(err, stdout) {
    if (err) {throw err; }
  });

  // const options = [normalFilePath, '-resize', '100', minifiedFilePath];
  // im.convert(options, function(err, stdout) {
  //   if (err) {throw err; }
  // });
});

console.log('Done.');
