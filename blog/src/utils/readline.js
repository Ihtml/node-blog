const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileFullName = path.resolve(__dirname, '../../logs/access.log')
const readStream = fs.createReadStream(fileFullName)

// readline是基于stream的
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

// 逐行读取
rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }
    
    // 记录总行数
    sum++
    const arr = lineData.split(' -- ')
    if (arr[4] && arr[4].indexOf('Chrome') > 0) {
        chromeNum++
    }
})
// 读取完成
rl.on('close', () => {
    console.log('日志总数：', sum);
    console.log('chrome数：', chromeNum);
    console.log('chrome 占比：', chromeNum/sum);
})