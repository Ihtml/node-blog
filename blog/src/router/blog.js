const { getList } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resMode')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST

    console.log(req.path);
    
    // 博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SuccessModel(listData, 'get list success') 
    }
}

module.exports = handleBlogRouter