const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行sql的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)  // 执行sql语句后返回的信息
            // {
            //     fieldCount: 0,
            //     affectedRows: 1,  // 影响行数
            //     insertId: 3,   // id信息
            //     serverStatus: 2,
            //     warningCount: 0,
            //     message: '',
            //     protocol41: true,
            //     changedRows: 0 // update的行数
            // }
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}