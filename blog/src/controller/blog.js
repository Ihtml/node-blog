const {exec} = require('../db/mysql')

const getList = (author, keyword) => {
    // 先返回格式正确的假数据
    console.log(author, keyword);
    let sql = `select * from blogs where 1=1 ` // 1=1 用来占位
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`

    return exec(sql)
}

const getDetail = (id) => {
    console.log('id: ',id);
    
    let sql = `select * from blogs where id='${id}' ` 

    return exec(sql).then((rows) => {
        return rows[0]
    })
}

const newBlog = (blogDaya = {}) => {
    return {
        id: 3
    }
}

const updateBlog = (id, blogDaya = {}) => {
    console.log('id', id);
    return true
}

const delBlog = (id) => {
    console.log('id', id);
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}