const Koa = require('koa')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('koa-router')()
const auth = require('./server/routes/auth.js') // 引入auth
const api = require('./server/routes/api.js') // 引入api
const jwt = require('koa-jwt')

const app = new Koa()
app.use(json())
app.use(bodyparser())
app.use(logger())

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %sms', ctx.method, ctx.url, ms) // 显示执行的时间
})

// app.use(async (ctx, next) => { //  如果JWT验证失败，返回验证失败信息
//   try {
//     await next()
//   } catch (err) {
//     if (err.status === 401) {
//       ctx.status = 401
//       ctx.body = {
//         success: false,
//         token: null,
//         info: 'Protected resource, use Authorization header to get access'
//       }
//     } else {
//       throw err
//     }
//   }
// })

app.on('error', async (err, ctx) => {
  console.log('server error', err)
})

router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/api', jwt({secret: 'vue-koa-demo'}), api.routes())
// 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致

app.use(router.routes()) // 将路由规则挂载到Koa上。

app.listen(4000, () => {
  console.log('Koa is listening in 4000')
})

module.exports = app
