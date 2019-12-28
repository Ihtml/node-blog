var express = require('express');
var router = express.Router(); // 生成路由的实例
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// POST请求根目录的回调
router.post('/login', function(req, res, next) {
  const {username, password} = req.body
  const result = login(username, password)
  return result.then(data => {
      if (data.username) {
          // 设置 session
          req.session.username = data.username
          req.session.realname = data.realname

          return res.json(
              new SuccessModel('登录成功')
          )
      }
      res.json(
          new ErrorModel('登录失败')
      )
  })
});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            msg: '已登录'
        })
    } else {
        res.json({
            msg: '未登录'
        })
    }
})

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.num == null){
//         session.num = 1
//     }
//     session.num ++

//     res.json({
//         count: session.num,
//         msg: '访问次数'
//     })
// })

module.exports = router;
