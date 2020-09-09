const pg = require('pg');
const db = new pg.Client({ database: 'jmsyy' })

db.connect( (err, client) => {
  if(err) { throw err }
  console.log(`connect to database`, db.database);
  db.end();
} )