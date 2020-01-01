const xss = require('xss')
const {exec, escape} = require('../db/mysql')

const getList = async (author, keyword) => {
    // 先返回格式正确的假数据
    console.log(author, keyword);
    let sql = `select * from blogs where 1=1 ` // 1=1 用来占位
    if (author) {
        author = escape(author)
        sql += `and author = ${author} `
    }
    if (keyword) {
        keyword = xss(escape(keyword))
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    
    return await exec(sql)
}

const getDetail = async (id) => {
    console.log('id: ',id);
    
    let sql = `select * from blogs where id='${id}' ` 
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含title content author属性
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    const author = blogData.author
    const createtime = Date.now()

    const sql = `
    INSERT INTO blogs (title, content, createtime, author) 
    VALUES(${title}, ${content}, '${createtime}', '${author}');
    `
    console.log('new blog sql: ', sql);
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    console.log('id', id);
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content}' 
        where id=${id}
    `
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    console.log('id', id);
    const sql = `
        delete from blogs where id=${id} and author='${author}';
    `
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}