const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  getData(req, res);
}).listen('8080', '127.0.0.1');
console.log('http://127.0.0.1:8080');

function getData(req, res) {
  fs.readFile('./demo.json', (err, data) => {
    if (err) {
      handleError(err, res);
    }
    const realData = JSON.parse(data);
    getHtmlFile(req, res, realData);
  });
}

function getHtmlFile(req, res, realData) {
  if (req.url === '/') {
    fs.readFile('./template.html', 'utf8', (err, data) => {
      if (err) {
        handleError(err, res);
      }
      formatHtml(data, res, realData);
    });
  }
}

function formatHtml(html, res, data) {
  const sendHtml = html.replace('%', data.demo.join('</li><li>'));
  responseData(sendHtml, res);
}

function responseData(data, res) {
  res.writeHead('200', {
    'Content-Type': 'text/html',
  });
  res.end(data);
}

function handleError(err, res) {
  console.log(err.message);
  res.end('500 Server Error');
}
