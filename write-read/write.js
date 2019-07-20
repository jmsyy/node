const fs = require('fs');
const codeString = `console.log('node writeFile')`;
const codeSyncString = `console.log('node writeFileSync')`;
const filePath = `./write-read/hello-node.js`;

/**
 * 文件异步写入
*/ 
function writeFile(fsPath=filePath,code=codeString) {
    fs.writeFile(fsPath,code,'utf-8',(err)=>{
        if (err) {
            throw err
        }
        console.log(`异步写入文件`);
        
    });
}


/**
 * 文件同步写入
*/ 
function writeFileSync(fsPath=filePath,codeSync=codeSyncString) {
    try {
    fs.writeFileSync(fsPath,codeSync,{position:1000,encoding:'utf-8'});
    console.log(`同步写入文件`);
    
    } catch (error) {
        console.log(error.message);
        
    }
}



/**
 * 文件流写入
 */

function writeStream(fsPath=filePath,code=codeString) {
    let writeStream = fs.createWriteStream(fsPath,'utf-8');
    writeStream.on('close',() => {
        console.log(`文件流写入关闭`);
    })
    writeStream.write(code);
    writeStream.end();
    
}

module.exports= {
    writeFile,
    writeFileSync,
    writeStream
}


