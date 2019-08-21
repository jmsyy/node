const cp = require('child_process');
const server = require('net').createServer();

const parent = cp.fork('child.js');
server.on('connection', (scoket) => {
  scoket.end('handle by parent process');
});
server.listen(8786, () => {
  parent.send({
    server,
  });
});

// 进程基础通信形式
// parent.on('message',(m) => {
//     console.log(`接收 子进程的消息${m}`);
// })
// parent.send({m:'hello child_process'});