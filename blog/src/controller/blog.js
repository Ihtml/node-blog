const xss = require('xss')
const {exec, escape} = require('../db/mysql')

const getList = (author, keyword) => {
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
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    const author = blogData.author
    const createtime = Date.now()

    const sql = `
    INSERT INTO blogs (title, content, createtime, author) 
    VALUES(${title}, ${content}, '${createtime}', '${author}');
    `
    console.log('new blog sql: ', sql);
    return exec(sql).then(insertData => {
        // console.log(insertData);
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    console.log('id', id);
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content}' 
        where id=${id}
    `
    return exec(sql).then(updateData => {
        console.log('updateData is:', updateData);
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    console.log('id', id);
    const sql = `
        delete from blogs where id=${id} and author='${author}';
    `
    return exec(sql).then(delData => {
        console.log('delData is :', delData);
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
    
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}