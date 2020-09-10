const pg = require('pg');
const db = new pg.Client({ database: 'jmsyy' })

db.connect( (err, client) => {
  if(err) { throw err }
  console.log(`connect to database`, db.database);
  db.end();
} )

// define table
db.query(`
  CERATE TABLE IF NOT EXISTS  example(
    id SERTAL,
    PRIMARY KEY (id),
    body text
  );
`, (err, result) => {
  if(err){ throw  err}
  console.log(`Created table example`);
  db.end();
});

// insert data

const body = 'hello postgreSql'
db.query(`
  INSERT INTO example (body) VALUES ('${body}')
  RETURNING id
`, (err, result) => {
  if(err) {throw err}
  const id = result.rows[0].id;
  console.log(`Insert row with id %s`, id);
});

// update data

const id = 1, updateTxt = 'hello node postgreSql';
db.query(`
  UPDATE example SET (body) = ('${body}') WHERE id=${id};
`, (err, result) => {
  if (err) {
    throw err
  }
  console.log(`Update %s rows`, result.rowCount);
})

// query data
db.query(`
  SELECT * FROM example ORDER BY id
`, (err, result) =>{
  if(err) throw err;
  console.log(result.rows);
});
