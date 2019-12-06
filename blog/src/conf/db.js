const env = process.env.NODE_ENV // 环境参数 开发环境还是生产环境

let MYSQL_CONF  // Mysql环境配置

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'yourpassword',
        port: '3306',
        database: 'nodeblog'  // 相当于 use nodeblog
    }
}

if (env === 'production') {
    
}

module.exports = {
    MYSQL_CONF
}