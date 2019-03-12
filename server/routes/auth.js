// routes/auth.js

const auth = require('../controllers/user.js')
const router = require('koa-router')()

// 查询用户信息
// 定义url的参数是id,用user的auth方法引入router
router.get('/user/:id', auth.getUserInfo)
// 登录验证
router.post('/user', auth.postUserAuth)

module.exports = router
