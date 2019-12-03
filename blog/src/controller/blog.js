const getList = (author, keyword) => {
    // 先返回格式正确的假数据
    console.log(author, keyword);
    
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1575189598027,
            author: 'aaa'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1575189646682,
            author: 'bbb'
        }
    ]
}

const getDetail = (id) => {
    console.log('id: ',id);
    
    return {
        id: id,
        content: `id为：${id}的文章内容`
    }
}

const newBlog = (blogDaya = {}) => {
    return {
        id: 3
    }
}

const updateBlog = (id, blogDaya = {}) => {
    console.log('id', id);
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog
}