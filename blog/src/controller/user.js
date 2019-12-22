const {exec, escape} = require('../db/mysql')

const login = (username, password) => {
    // use fake data
    // if (username === 'IFE' && password === '123') {
    //     return true
    // }
    // return false
    username = xss(escape(username))
    password = xss(escape(password))
    const sql = `
        select username, realname from users
        where username=${username} and password=${password}
    `
    console.log(username, password);
    console.log('sql is ', sql);
    
    return exec(sql).then(rows => {
        console.log('rows: ', rows);
        return rows[0] || {}  // select语句返回数组，只需要第一项, 如果没有，返回空对象
    })
}

module.exports = {login}