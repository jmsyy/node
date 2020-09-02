const async = require('async');
const exec = require('child_process').exec;

function downLoad(version, destination, callback) {
  const url = `https://nodejs.org/dist/v${version}/node-${version}.tar.gz`;
  const filePath = `${destination}/${version}.taz`;
  exec(`curl ${url} > ${filePath}`, callback);  
}

async.series([
  callback => {
    async.parallel([
      callback => {
        console.log(` downloading Node v4.4.7`);
        downLoad('4.4.7', '/tmp', callback)
      },  
      callback => {
        console.log(` downloading Node v6.3.0`);
        downLoad('6.3.0', '/tmp', callback)
      },  
    ], callback)
  },
  callback => {
    console.log(` creating archive of download`);
    exec('tar cvf node_distros.tar /tmp/4.4.7.tgz /tmp/6.3.0.tgz', err =>{
      if (err) {
        throw err
      }
      console.log(`everything is done`);
      callback()
    })
  }
])