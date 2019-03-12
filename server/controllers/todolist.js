const todolist = require('../models/todolist.js')

// 获取用户的全部todos
const getTodolist = async (ctx) => {
  const id = ctx.params.id
  const result = await todolist.getTodolistById(id)
  ctx.body = result
}

// 创建todo
const createTodolist = async (ctx) => {
  const data = ctx.request.body
  const success = await todolist.createTodolist(data)
  ctx.body = {
    success
  }
}

// 完成todo
const finishTodo = async (ctx) => {
  const data = ctx.request.body
  const success = await todolist.finishTodo(data)
  ctx.body = {
    success
  }
}

// 删除todo
const deleteTodo = async (ctx) => {
  const data = ctx.request.body
  const success = await todolist.deleteTodo(data)
  ctx.body = {
    success
  }
}

module.exports = {
  getTodolist,
  createTodolist,
  finishTodo,
  deleteTodo
}
