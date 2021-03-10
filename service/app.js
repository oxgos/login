const Koa = require('koa')
const app = new Koa()

const PORT = 3000

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(PORT, () => {
  console.log(`服务运行在localost:${PORT}`)
})