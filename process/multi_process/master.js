const os = require('os').cpus();
const { fork } = require('child_process');

for (let index = 0; index < os.length; index += 1) {
  fork('./process/multi_process/worker.js');
}