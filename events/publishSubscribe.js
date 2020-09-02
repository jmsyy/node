const events = require('events');
const net = require('net');

const channel = new events.EventEmitter();
channel.client = {};
channel.subscriptions = {};

channel.on('join', function(id, client ) {
  const txt = `welcome NO.${id} join chartRoom`;
  this.client[id] = client;
  client.write(txt);
  this.subscriptions[id] = (senderId, message) =>{
    if (id !== senderId) {
      this.client[id].write(message);
    }
  }
  this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function (id) {
  channel.removeListener('broadcast', this.subscriptions[id])
  channel.emit('broadcast', id, `${id} has left the chatroom \n`);
})

channel.on('shutDown', function (id) {
  channel.emit('broadcast', '', `The server has shutDown \n`);
  channel.removeAllListeners('broadcast')
})


const server  = net.createServer( client => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit('join', id, client);
  client.on('data', (data) => {
    data = data.toString();
    if( data === 'shutDown' ){
      channel.emit('shutDown');
    }
    channel.emit('broadcast', id, data)
  } );
  channel.on('close', () =>{
    channel.emit('leave', id)
  })
});

server.listen(8888);

console.log(`server is running `)
