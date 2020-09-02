const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFileName = './feeds.txt'

function checkFile() {
  fs.exists(configFileName, (exists) =>{
    if (!exists) {
      return goOn(new Error(`no such file`));
    }
    goOn(null, configFileName)
  });
}

function readFile(configFileName) {
  fs.readFile(configFileName, (err, fileList)=>{
    if (err) {
      throw err
    }

    fileList = fileList.toString().replace(/^\s+\s+$/, '').split('\n');
    const random = Math.floor(Math.random() * fileList.length); 
    goOn(null, fileList[random]);
  })
}

function downloadFile(url) {
  request({url}, (err, res, body) =>{
    if (err) {
      throw err
    }

    if(res.statusCode !== 200){
      return goOn(new Error(`request is fail`));
    }
    goOn(null, body)
  })
}

function parseFile(res) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(res);

  if (!handler.dom.items.length) {
    return goOn(new Error(`no dom is found`))
  }

  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

const task = [
  checkFile,
  readFile,
  downloadFile,
  parseFile
];

function goOn(err, result) {
  if (err) {
    throw err
  }

  const currentTask = task.shift();
  if(currentTask){
    currentTask(result)
  }
}

goOn()