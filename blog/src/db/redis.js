const redis = require('redis')
const { REDIS_CONF} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err);
})

/**
 * redis set
 * @param {string} key 
 * @param {string|Object} val 
 * @param {number} timeout 过期时间，单位 s ，默认 7day
 */
function set(key, val, timeout= 60*60*27*7){
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
    redisClient.expire(key, timeout)
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
