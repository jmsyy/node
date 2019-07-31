const net = require('net');
const http = require('http');

const option = {
    path:'/',
    port:'1337',
    hostname:"127.0.0.1",
    method:'GET'
};
const httpReq = function () {
    let req = http.request(option,(res) => {
        console.log(`Status ${res.statusCode}`);
        console.log(`Head ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf-8');
        res.on('data',(chunk) => {
            console.log(chunk);
        })    
    });
    req.end();
};
httpReq();

function tcpReq() {
    const client = net.connect({port:8124},() => {
        console.log('client connect');
        client.write('world!\r\n');
    });
    
    client.on('data',(data) => {
        console.log(data);
        client.end();
    });
    client.on('end',() => {
        console.log(`client disconnected`);
    })
}
