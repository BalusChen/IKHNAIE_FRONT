<template>
  <div class="hello">
    <img src="../assets/ikhnaie.jpeg" width="240" height="320" />
    <h1>{{ msg }}</h1>

    <div id="login">
      <el-form ref="loginForm" status-icon label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
        </el-form-item>

        <el-form-item id="password" prop="password" label="密码">
          <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" id="doAction">
        <el-button type="primary" @click="doLogin()">确 定</el-button>
        <el-button @click="dialogVisible = true">注册</el-button>
      </span>
    </div>

    <div>
      <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>

          <el-form-item prop="user_id" label="身份证号">
            <el-input v-model="user.userID" placeholder="请输入身份证号" prefix-icon></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input v-model="user.password" placeholder="请输入密码" prefix-icon></el-input>
          </el-form-item>

          <el-form-item prop="organization" label="组织">
            <el-input v-model="user.organization" placeholder="请输入组织" prefix-icon></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" id="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doRegister()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '欢迎来到 IKHNAIE 农产品溯源系统',
      dialogVisible: false,
      user: {
        username: '',
        userID: '',
        password: ''
      }
    }
  },

  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    doLogin() {
      if (!this.user.username) {
        this.$message.error('请输入用户名！')
      } else if (!this.user.password) {
        this.$message.error('请输入密码')
      } else {
        axios
          .post(
            'http://localhost:9877/ikhnaie/v1/user/login',
            qs.stringify({
              username: this.user.username,
              password: this.user.password
            })
          )
          .then(response => {
            if (response.data.status_code === 200) {
              this.$message.success('登录成功')
              this.$cookies.set('user', response.data.user)
              this.$router.push('user')
            } else {
              this.$message.error('用户名或密码不准确')
            }
          })
          .catch(() => {
            this.$message.error('请求失败')
          })
      }
    },

    doRegister() {
      if (!this.user.username) {
        this.$message.error('请输入用户名')
      } else if (!this.user.userID) {
        this.$message.error('请输入身份证号')
      } else if (!this.user.password) {
        this.$message.error('请输入密码')
      } else {
        axios
          .post(
            'http://localhost:9877/ikhnaie/v1/user/register',
            qs.stringify({
              username: this.user.username,
              user_id: this.user.userID,
              password: this.user.password,
              organization: this.user.organization
            })
          )
          .then(response => {
            console.log(response.data)
            if (response.data.status_code === 200) {
              alert('注册成功')
            } else {
              alert('注册失败')
            }
          })
      }

      this.dialogVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}

#login {
  width: 400px;
  height: 300px;
  overflow: hidden;
  margin-left: 600px;
  margin-top: 100px;
  padding-top: 10px;
  line-height: 30px;
  text-align: center;
}

#doAction {
  text-align: center;
  margin-left: 70px;
}
</style>
