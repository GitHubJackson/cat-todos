// controllers/user.js

const user = require('../models/user.js')
// const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const getUserInfo = async (ctx) => {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await user.getUserById(id) // await "同步"地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const postUserAuth = async (ctx) => {
  const data = ctx.request.body
  const userInfo = await user.getUserByName(data.username)

  if (userInfo !== null) {
    if (userInfo.password !== data.password) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误'
      }
    } else {
      const userToken = {
        name: userInfo.username,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo' // 指定密钥，用来判断token合法性
      const token = jwt.sign(userToken, secret) // 签发token
      ctx.body = {
        success: true,
        token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！'
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth
}
