const loginCheck = (username, password) => {
    // use fake data
    if (username === 'IFE' && password === '123') {
        return true
    }
    return false
}

module.exports = {loginCheck}