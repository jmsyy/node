const redis = require('redis');

// 如果Redis运行在本机的默认端口上，则无须提供参数
const db = redis.createClient(6397, '127.0.0.1');

db.on('connect', () => console.log(`client connected `))
db.on('ready', () => console.log(`client ready`))
db.on('error', (err) => console.log(`client connected`))

// 键值对
db.set('color', 'red', err => { if(err) {throw err} });
db.get('color', (err, result) => {
  if(err) {throw err}
  console.log(`Get value %s`, result);
})

// 散列表

db.hmset('student', {
  name:'jupiter',
  age:18
},redis.print)
db.hget('student', 'name', (err, result) => console.log(`Get student name %s`, result));

db.hkeys('student', (err, keys) => {
  keys.toString();
});


