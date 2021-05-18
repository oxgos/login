const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./routers/index')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const PORT = 3000

const app = new Koa()

app.keys = ['keys', 'key-secret']
app.use(session({
  key: 'login.sid', //浏览器 cookie 的名字
  prefix: 'login:sess:', //redis key 的前缀
  cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({         //redis的储存
      all: '127.0.0.1:6379'
  })
}))

// app.use(async (ctx, next) => {
//   var session = ctx.session;
//   session.count = session.count || 0;
//   session.count++;
//   ctx.body = ctx.session.counter;
//   await next()
// })

app.use(koaBody())
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`服务运行在localost:${PORT}`)
})
