<template>
  <div>
    <div style="text-align:center">
      <img src="@/assets/logo.png">
    </div>
    <div class="">
      <el-row class="content">
        <el-col :xs="24" :sm="{span: 6,offset: 9}">
          <div style="text-align:center">
            <span class="title">
            欢迎登录
            </span>
          </div>
          <el-row>
            <el-input
              v-model="username"
              placeholder="账号"
              type="text">
            </el-input>
            <el-input
              v-model="password"
              placeholder="密码"
              type="password">
            </el-input>
            <el-button type="primary" @click="loginToTodos()">登录</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginToTodos () {
      // this.$router.push('/todolist')
      let json = {
        username: this.username,
        password: this.password
      }
      this.$http.post('/auth/user', json).then((res) => {
        console.log(res)
        if (res.data.success) { // axios返回的数据都在res.data中
          sessionStorage.setItem('demo-token', res.data.token)
          this.$message({
            type: 'success',
            message: '登录成功！'
          })
          this.$router.push('/todolist')
        } else {
          this.$message.error(res.data.info)
          sessionStorage.setItem('demo-token', null) // 将token清空
        }
      }).catch((err) => {
        this.$message.error('请求错误！')
        sessionStorage.setItem('demo-token', null)
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-row.content{
  padding: 16px
}
.title{
  font-size: 28px
}
.el-input{
  margin: 12px 0
}
.el-button{
  width: 100%;
  margin-top: 12px
}

</style>
