const Sequelize = require('sequelize') // 引入sequelize

// 注意将root: 后面的XXXX改成自己数据库的密码
const Todolist = new Sequelize('mysql://root:zwb1359926897@localhost/todolist', {
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = {
  Todolist
}
