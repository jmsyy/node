process.on('message', (m, server) => {
  if (m === 'server') {
    server.on('connection', (socket) => {
      socket.end('handle by child process');
    });
  }
});
// process.send('hello parent process');