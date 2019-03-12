// models/user.js
const db = require('../config/db.js')
const userModel = '../schema/user.js'
const TodolistDb = db.Todolist // 引入数据库

const User = TodolistDb.import(userModel)

// 根据id查找用户
const getUserById = async (id) => {
  const userInfo = await User.findOne({ // 用await控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      id: id
    }
  })

  return userInfo // 返回数据
}

// 根据用户名查找用户
const getUserByName = async (username) => {
  const userInfo = await User.findOne({
    where: {
      username: username
    }
  })

  return userInfo
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName
}
