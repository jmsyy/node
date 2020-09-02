const fs = require('fs');
const path = require('path');

const tasks = [];
const wordCounts = {};
let completeTasks = 0;

function checkIfComplete() {
  completeTasks++;
  if (completeTasks === tasks.length) {
    for (let item in wordCounts) {
      console.log(`${item}:${wordCounts[item]}`);
    }
  }
}
function addWord(word) {
  wordCounts[word] = (wordCounts[word])?wordCounts[word]+1:1
}

function countWordsInText(text) {
  const words = text.toString().toLowerCase().split(/\w+/).sort()
  words.filter(item => item).forEach(word => addWord(word));
}
const dir = path.join(__dirname);
fs.readdir(dir, (err, fileList) => {
  if(err){throw err}

  fileList.forEach(file =>{
    const  task = (file => {
      return () =>{
        fs.readFile(file, (err, text) =>{
          if(err){throw err}

          countWordsInText(text)
          checkIfComplete()
        });
      };
    })(`${dir}/${file}`) 
    tasks.push(task)
  })
  tasks.forEach(task => task());
})

