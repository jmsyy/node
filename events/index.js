const FileWatcher = require('./fileWatch.js');
const fs = require('fs');

const watcher = new FileWatcher('../es', '../done');

watcher.on('process', (file) =>{
  const watchFile = `${watcher.watchDir}/${file}`;
  const processFile = `${watcher.processedDir}/${file.toLowerCase()}`;
  fs.rename(watchFile, processFile , err => {
    if (err) {
      throw err;
    }
  })
})

watcher.start()