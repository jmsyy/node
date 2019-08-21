const http = require('http');

http.createServer((res) => {
  res.writeHead('Content-Type', 'text/plain');
  res.end('hello multiProcess worker');
}).listen(Math.round((1 + Math.random()) * 1000), '127.0.0.1');