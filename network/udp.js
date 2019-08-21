const dgram = require('dgram');

const UDP = dgram.createSocket('udp4');
UDP.on('message', (msg, rinfo) => {
  console.log(msg, rinfo.address, rinfo.port);
});
UDP.on('listening', () => {
  const address = UDP.address();
  console.log(address.address, address.port);
});

const message = Buffer.alloc('hello udp');
const client = dgram.createSocket('udp4');
client.send(message, 0, message.length, 41234, 'localhost', () => {
  client.close();
});
