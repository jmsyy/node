const Koa = require('koa');
const app = new Koa();

// app.use(function* next() {
//   const start = new Date;
//   yield next;
//   const ms = new Date -  start;
//   console.log('$s $s - $s', this.method, this.url, ms);
// });

app.use(async (ctx) => {
  ctx.body = 'hello koa';
});

app.listen(4000);