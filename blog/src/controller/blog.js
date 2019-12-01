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

module.exports = {
    getList
}