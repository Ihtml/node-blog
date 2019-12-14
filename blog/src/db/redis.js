const redis = require('redis')
const { REDIS_CONF} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err);
})

function set(key, val){
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key, val){
     const promise = new Promise((resolve, reject) => {
         redisClient.get(key, (err, val) => {
             if (err) {
                 reject(err)
                 return
             }
             if(val == null){ // 如果找不到key,返回null
                 resolve(null)
                 return
             }
             try {
                 const obj = JSON.parse(val)
                 resolve(obj)
             } catch (ex) {
                 resolve(val)
             }
         })
     })
     return promise
}

module.exports = {
    set,
    get
}
