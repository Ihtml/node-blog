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

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title content author属性
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()

    const sql = `
    INSERT INTO blogs (title, content, createtime, author) 
    VALUES('${title}', '${content}', '${createtime}', '${author}');
    `

    return exec(sql).then(insertData => {
        // console.log(insertData);
        return {
            id: insertData.insertId
        }
    })
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