const events = require('events');
const fs = require('fs');

class Watcher extends events.EventEmitter {
  constructor(watchDir, processedDir) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }
  watch(){
    fs.readdir(this.watchDir, (err, files) => {
      if(err){ throw err}
      for (const cur of files) {
        this.emit('process', cur);
      }
    });
  }
  start(){
    fs.watchFile(this.watchDir, () => {
      this.watch();
    } )
  }
}

module.exports = Watcher;