// crypto是node提供的用来加密的库
const crypto = require('crypto')

// 密钥，可以是随机字符串
const SECRET_KEY = 'QWEasd_456%*!'

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    // 输出变成16进制
    return md5.update(content).digest('hex')
}

// 加密函数,只要密码明文是一样的，加密出来的结果就是一样的
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}