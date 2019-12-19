// 路由层
// 通过controler层获取
// model层对数据进行包装

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const id = req.query.id || '' // 拿到参数带的id
    console.log(req.path);

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }
        const result = getList(author, keyword)
        return result.then((listData) => {
            return new SuccessModel(listData, 'get list success')
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const result = getDetail(id)
        // return new SuccessModel(result, 'get blog detail success')
        const result = getDetail(id)
        return result.then((data) => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SuccessModel(data)

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客内容
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel('更新博客成功')
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    //  删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }
        const author = req.session.username
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel(`博客${id}删除成功`)
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter