const router = require('koa-router')()

router.prefix('/api/user')  

router.post('/login', async function (ctx, next) {
  const {username, password} = ctx.request.body
  ctx.body = {
      status: 200,
      username,
      password
  }
})

router.get('/session-test', async function (ctx, next) {
  if (ctx.session.viewCount == null) {
      ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  console.log(typeof ctx.session.viewCount);
  

  ctx.body = {
      status: 200,
      viewCount: ctx.session.viewCount
  }
})

module.exports = router
