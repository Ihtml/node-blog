const {exec, escape} = require('../db/mysql')
const {genPassword} = require('../utils/crypto')
const xss = require('xss')

const login = async (username, password) => {
    // use fake data
    // if (username === 'IFE' && password === '123') {
    //     return true
    // }
    // return false
    username = xss(escape(username))

    // 生成加密密码
    password = genPassword(password)
    password = xss(escape(password))

    const sql = `
        select username, realname from users
        where username=${username} and password=${password}
    `
    console.log(username, password);
    console.log('sql is ', sql);
    
    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {login}