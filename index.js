const {writeFile,writeFileSync,writeStream} = require('./write-read/write.js');
writeFileSync();

writeFile('./write-read/node.txt','hello world node');
const file = require('file_module');

