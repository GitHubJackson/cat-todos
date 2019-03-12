const db = require('../config/db')
const todoModel = '../schema/list.js'
const TodolistDb = db.Todolist

const Todolist = TodolistDb.import(todoModel)

// 获取用户的全部todos
const getTodolistById = async (id) => {
  const todolist = await Todolist.findAll({
    where: {
      user_id: id
    },
    attributes: ['id', 'content', 'status']
  })
  return todolist // 返回数据
}

// 创建todo
const createTodolist = async (data) => {
  await Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status
  })
  return true
}

// 完成todo
const finishTodo = async (data) => {
  await Todolist.update(
    {
      status: data.status
    },
    {
      where: {
        id: data.id,
        user_id: data.user_id
      }
    }
  )
  return true
}

// 删除todo
const deleteTodo = async (data) => {
  await Todolist.destroy({
    where: {
      id: data.id,
      user_id: data.user_id
    }
  })
  return true
}

module.exports = {
  getTodolistById,
  createTodolist,
  finishTodo,
  deleteTodo
}
