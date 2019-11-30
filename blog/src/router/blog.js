const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST

    console.log(req.path);
    
    // 博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: '博客列表'
        }
    }
}

module.exports = handleBlogRouter