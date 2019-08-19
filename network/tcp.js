const net = require('net');

const TCP = net.createServer();
TCP.on('connection',(socket) => {
    socket.on('data',(data) => {
        socket.write('hello node');
    });
    socket.on('end',() => {
        console.log(`断开连接`);
    });
    socket.on('error',(error) => {
        console.log(error);
    })
    socket.write(`欢迎光临《深入浅出Node.js》示例：\n`);
})
TCP.listen('8090');