const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('node_db.sqlite');
db.serialize(() => {
  const sql = 'CREATE TABLE IF NOT EXISTS blog (id integer primary key, title, content TEXT)';
  db.run(sql);
});
class Article {
  static all(cb) {
    db.all('SELECT * FROM blog', cb);
  }

  static find(id, cb) {
    db.get('SELECT * FROM blog WHERE id = ?', id, cb);
  }

  static create(data, cb) {
    const sql = 'INSERT INTO blog(title, content) VALUES (?, ?)';
    db.run(sql, data.title, data.content, cb);
  }

  static delete(id, cb) {
    if (!id) {
      return new Error('please check your print id');
    }
    db.run('DELETE FROM article WHERE id = ?', id, cb);
  }
}
module.exports = db;
module.exports.Article = Article;