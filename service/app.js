const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./routers/index')

const PORT = 3000

const app = new Koa()


app.use(koaBody())
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`服务运行在localost:${PORT}`)
})
