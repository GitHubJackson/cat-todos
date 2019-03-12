// server/routes/api.js

const api = require('../controllers/todolist.js')
const router = require('koa-router')()

// todolist(router) // 引入koa-router
// 获取todo
router.get('/todolist/:id', api.getTodolist)
// 添加todo
router.post('/addtodo', api.createTodolist)
// 完成todo
router.post('/finishtodo', api.finishTodo)
// 删除todo
router.post('/deletetodo', api.deleteTodo)

module.exports = router // 导出router规则
