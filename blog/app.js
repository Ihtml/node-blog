const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理POST data
/**
 * 如果是POST请求，并且是json的数据，则返回JSON对象
 * @param {*} req 
 * @return promise 
 */
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // POST 请求
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        // 接收POST数据
        let result = Buffer.from([])
        // 当接收到post数据的时候会触发‘data’事件
        req.on('data', chunk => {
            result = Buffer.concat([result, chunk])// chunk本身是二进制的格式,要转字符串
        })
        // 接收完后触发end事件
        req.on('end', () => {
            // resData.postData = result
            result = result.toString()
            if (!result) {  // 数据为空
                resolve({})
                return
            }
            console.log('res: ', result);
            resolve(
                JSON.parse(result)
            )
        })
    })
    return promise
}

// 设置 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

// 解析 session
const SESSION_DATA = {}
let needSetCookie = false

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = queryString.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3;
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim() // 去掉cookie拼接key val的时候自动加的空格
        const val = arr[1].trim()
        req.cookie[key] = val
    })
    console.log('cookie is:', req.cookie);

    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else { // 如果cookie中没有userid,就创建一个userid返回给浏览器
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    
    // 处理post data
    getPostData(req).then(postData => {
        req.body = postData

        // 处理blog路由
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogData = handleBlogRouter(req, res)  // 返回promise
        if (blogData) {
            blogData.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理user路由
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(JSON.stringify(userData))
        //     return
        // }
        const userResult= handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 未命中路由 返回404
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write("404 Not Found\n")
        res.end()
    })

}

module.exports = serverHandle