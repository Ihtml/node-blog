// 路由层
// 通过controler层获取
// model层对数据进行包装

const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resMode')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const id = req.query.id || ''
    console.log(req.path);
    
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SuccessModel(listData, 'get list success') 
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return new SuccessModel(result, 'get blog detail success')
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }

    // 更新博客内容
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel(data)
        } else {
            return new ErrorModel('更新博客失败')
        }
    }
}

module.exports = handleBlogRouter