const fs = require('fs');
const http = require('http');
const ejs = require('ejs');
// const hogan = require('hogan');
const pug = require('pug');
const ejsT = fs.readFileSync('./view/blog_page.ejs', 'utf-8')
const pugT = fs.readFileSync('./view/view.pug', 'utf-8')
function getEntries() {
  const entries = [];
  let entriesRaw = fs.readFileSync('./entries.txt', 'utf-8');
  entriesRaw = entriesRaw.split('---');
  entriesRaw.map((item) => {
    const lines = item.split('\n');
    const entry = {};
    lines.forEach(val => {
      let [key, value] = val.split(':');
      entry[key] = value
    });
    entries.push(entry);
  });
  return entries;
}

function useEjs(entries) {
  const values = {entries}
  return ejs.render(ejsT, values)
}

function useHogan(entries) {
  const values = {entries}
  return hogan.render(hoganT, values)
}

function usePug(entries) {
  const values = {entries}
  const fn = pug.compile(pugT)
  return fn(values)
}

function initTemplate() {
  const [exe, dir, type] = process.argv;
  const content =  getEntries();
  switch (type) {
    case 'hogan':
      return useHogan(content);
    case 'pug':
      return usePug(content);
    default:
      return useEjs(content)
  }
}
const server = http.createServer((req, res) => {
  const output = initTemplate();
  res.writeHead(200, {'Context-Type':'text/html'});
  res.end(output)
})

server.listen(8000)