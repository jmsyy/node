const cp = require('child_process');
const parent = cp.fork('child.js');
const server = require('net').createServer();
server.on('connection',(scoket) => {
    scoket.end('handle by parent process');
})
server.listen(8786,() => {
    parent.send({server:server});
})

// 进程基础通信形式
// parent.on('message',(m) => {
//     console.log(`接收 子进程的消息${m}`);
// })
// parent.send({m:'hello child_process'});