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
        const result = Buffer.from([])
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


const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = queryString.parse(url.split('?')[1])

    // 处理post data
    getPostData(req).then(postData => {
        req.body = postData

        // 处理blog路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }

        // 处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }

        // 未命中路由 返回404
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write("404 Not Found\n")
        res.end()
    })

}

module.exports = serverHandle