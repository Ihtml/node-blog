const fs = require('fs')
const path = require('path')

const createWriteStream = (fileName) => {
    const fileFullName = path.resolve(__dirname, '../../logs', fileName)
    console.log(fileFullName);
    const writeStream = fs.createWriteStream(fileFullName, {
        flags: 'a' // 通过append追加的方式写入
    }) 
    return writeStream
}
const accessWriteStream = createWriteStream('access.log')

const writeLog = (writeStream,log) => {
    writeStream.write(log + '\n')
}
// 写访问日志的函数 
const access = (log) => {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}
 