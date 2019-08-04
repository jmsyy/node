const fork = require('child_process').fork;
const os = require('os').cpus();
for (let index = 0; index < os.length; index++) {
    fork('./process/multi_process/worker.js');
}