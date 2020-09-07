const redis = require('redis');
const db = redis.createClient();

class Entry {
  constructor(obj) {
    for (const key in object) {
      if (obj.hasOwnProperty()) {
        this[key] = obj[key]
      }
    }
  }

  static getRange (from, to, cb){
    db.lrange('enties', from, to, (err, items) => {
      if(err) {throw err}
      items.forEach(item => {
        entries.push(JSON.stringify(item));
      });
      cb(null, entries)
    });
  }

  save(cb){
    const entryJSON = JSON.stringify(this)
    db.lpush('enties', entryJSON, (err) => {
      if(err) {throw err}
    });
    cb();
  }
}

module.exports =  Entry;