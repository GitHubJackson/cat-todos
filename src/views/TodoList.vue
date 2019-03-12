<template>
  <div class="taskBox">
    <div class="header">
      欢迎：{{username}}!你的待办事项如下：
    </div>

    <div class="taskInput">
      <el-input placeholder="请输入待办事项" v-model="taskInput" @keyup.native.enter="addTodo()"></el-input>
    </div>

    <el-tabs class="tabs" v-model="activeName">
      <el-tab-pane label="待办事项" name="doing">
        <template v-if="doingCount>0">
          <template v-for="(item,index) in todolist">
            <div class="doingTask task" :key="index" v-if="item.status===0">
              <span class="content">{{index+1}}. {{item.content}}</span>
              <div class="btns">
                <el-button type="primary" size="small" @click="finishTask(index)">完成</el-button>
                <el-button size="small" @click="deleteTask(index)">删除</el-button>
              </div>
            </div>
          </template>
        </template>
        <!-- 当doingCount为0，即列表为空时显示暂无待办事项 -->
        <div v-else>
          暂无待办事项
        </div>
      </el-tab-pane>

      <el-tab-pane label="已完成事项" name="done">
        <template v-if="doneCount>0">
          <template v-for="(item,index) in todolist">
            <div :key="index" class="doneTask task" v-if="item.status===1">
              <span class="content">{{index+1}}. {{item.content}}</span>
              <div class="btns">
                <el-button type="primary" size="small" @click="backTask(index)">还原</el-button>
              </div>
            </div>
          </template>
        </template>

        <div v-else>
          暂无已完成事项
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import jwt from 'jsonwebtoken'
export default {
  name: '',
  data () {
    return {
      id: '',
      username: 'JacksonZhou',
      taskInput: '',
      doingCount: 0,
      doneCount: 0,

      todolist: [],

      activeName: 'doing'
    }
  },
  created () {
    const userInfo = this.getUserInfo()
    if (userInfo !== null) {
      this.id = userInfo.id
      this.username = userInfo.name
    } else {
      this.id = ''
      this.username = ''
    }
    this.getTodolist()
  },
  methods: {
    // 获取todo列表
    getTodolist () {
      // console.log('获取todos')
      this.$http.get('/api/todolist/' + this.id).then((res) => {
        if (res.status === 200) {
          this.doingCount = 0
          this.doneCount = 0
          this.todolist = res.data
          // 统计待办事项和已完成事项
          for (let todo of this.todolist) {
            if (todo.status === 0) {
              this.doingCount += 1
            } else {
              this.doneCount += 1
            }
          }
          // console.log(this.todolist)
        } else {
          this.$message.error('获取列表失败')
        }
      }).catch((err) => {
        this.$message.error('获取列表失败')
        console.log(err)
      })
    },
    // 加入任务
    addTodo () {
      // console.log('添加任务')
      if (this.todolist === '') {
        this.$message.warning('没事就好好陪女朋友吧~')
        return
      }
      let json = {
        content: this.taskInput,
        status: 0,
        id: this.id
      }
      this.$http.post('/api/addtodo', json).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.getTodolist()
        } else {
          this.$message.error('创建失败!')
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('创建失败!')
      })
      this.taskInput = ''
    },
    // 完成任务
    finishTask (index) {
      let json = {
        user_id: this.id,
        id: this.todolist[index].id,
        status: 1
      }
      this.$http.post('/api/finishtodo', json).then((res) => {
        // console.log(res.data)
        this.$message({
          type: 'success',
          message: '脱下一件包袱，继续加油吧!'
        })
        this.getTodolist()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除任务
    deleteTask (index) {
      // console.log(index)
      let json = {
        user_id: this.id,
        id: this.todolist[index].id
      }
      this.$http.post('/api/deletetodo', json).then((res) => {
        // console.log(res.data)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getTodolist()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 还原任务
    backTask (index) {
      // console.log(index)
      let json = {
        user_id: this.id,
        id: this.todolist[index].id,
        status: 0
      }
      this.$http.post('/api/finishtodo', json).then((res) => {
        // console.log(res.data)
        this.$message({
          type: 'success',
          message: '还没完成呢，捡起来继续做!'
        })
        this.getTodolist()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 解析token获取用户名
    getUserInfo () {
      const token = sessionStorage.getItem('demo-token')
      if (token !== null && token !== 'null') {
        let decode = jwt.decode(token)
        return decode
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.taskBox {
  width: 400px;
  height: 500px;
  margin: 50px auto;
  border: 1px solid #CCC;
  padding: 20px;
  .header {
    text-align: center;
    margin: 20px auto;
  }
  .tabs {
    .task {
      border-bottom: 1px solid #CCC;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .doneTask {
      .content {
        color: #CCC;
        text-decoration: line-through;
      }
    }
  }
}
</style>
