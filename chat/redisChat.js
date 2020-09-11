const net = require('net');
const redis = require('redis');

const server = net.createServer(socket =>{
  const subscriber = redis.createClient();
  subscriber.subscribe('main');
  subscriber.on('message', (chanel, data) =>{
    console.log(`get chanel %s message %s`, chanel, data);
  });

  const publisher = redis.createClient();
  socket.on('data', (msg) => {
    publisher.publish('main', msg)
  });

  socket.on('end', () => {
    subscriber.unsubscribe('main');
    subscriber.end(true);
    publisher.end(true);
  });
});

server.listen(7000)