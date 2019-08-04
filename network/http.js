const http = require('http');
const url = require('url');
http.createServer((req,res) => {
    reqMethod(req,res);
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('hello http clinet');
}).listen(1337,'127.0.0.1');
console.log('http server runing at http://127.0.0.1');
function reqMethod(req,res) {
    switch (req.method) {
        case 'OPTION':
            break;
        case 'POST':
            break;
        case 'DELETE':
            break;
        case 'GET':
        default:
            get(req,res);
    }
}
function get(req,res) {
    /**
     * foo=bar&foo=baz 
     * { foo: ['bar', 'baz'] } 
     * 业务的判断一定要检查值是数组还是字符串，否则可能出现TypeError异常的情况
     */
    req.query = url.parse(req.url,true).query();
    console.log(req.query);
}
