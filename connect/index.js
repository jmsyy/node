const connect = require('connect');

const app = connect();

app.use((req, res, next) => {
  console.log('%s $s ', req.method, req.url);
  next();
})

app.use((req, res) => {
  res.setHeader('Connect-Type', 'text/plain');
  res.end(`hello connect`);
})


app.listen(6000, (err) =>{
  if (err) {
    console.log(err);
  }
})

function setUp(format) {
  const reg = /:\w+/g;
  return function  creatMiddler(req, res, next) {
    const str = format.replace(reg, (match, property ) =>{
      return req[property];
    });
    console.log(str)
    next()
  }
}