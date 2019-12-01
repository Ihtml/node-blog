// 路由层
// 通过controler层获取
// model层对数据进行包装

const { getList, getDetail } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resMode')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST

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
        const id = req.query.id || '' 
        const result = getDetail(id)
        return new SuccessModel(result, 'get blog detail success')
    }
}

module.exports = handleBlogRouter