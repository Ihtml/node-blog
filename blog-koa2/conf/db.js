const env = process.env.NODE_ENV // 环境参数 开发环境还是生产环境

let MYSQL_CONF  // Mysql环境配置
let REDIS_CONF // redis环境配置

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'usemysql',
        port: '3306',
        database: 'nodeblog'  // 相当于 use nodeblog
    }

    REDIS_CONF = {
        port:  6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'usemysql',
        port: '3306',
        database: 'nodeblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}