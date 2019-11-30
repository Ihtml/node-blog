const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    const testData = {
        name: 'zhangsan',
        age: 30,
        env: process.env.NODE_ENV
    }
    res.end(JSON.stringify(testData))
}

module.exports = serverHandle