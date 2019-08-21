const fs = require('fs');
// const path = require('path');
const Watcher = require('./watcher');

const watchDir = __dirname;
const processedDir = '../talk-room';
const watcher = new Watcher(watchDir, processedDir);
watcher.on('process', (file) => {
  const watchFile = `${watchDir}/${file}`;
  const processFile = `${processedDir}/${file.toLowerCase()}`;
  fs.rename(watchFile, processFile, (error) => {
    if (error) { throw error; }
  });
});
watcher.start();