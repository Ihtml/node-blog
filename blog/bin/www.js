const http = require('http')

const HOST = '127.0.0.1'
const PORT = 9999
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT, HOST, ()=> {
    console.log(`Server running at http://${HOST}:${PORT}/`);
})
