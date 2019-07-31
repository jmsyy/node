const http = require('http');
http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('hello http clinet');
}).listen(1337,'127.0.0.1');
console.log('http server runing at http://127.0.0.1');
