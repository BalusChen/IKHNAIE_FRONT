<template>
  <el-table :data="users">
    <el-table-column prop="user_name" label="用户名"></el-table-column>
    <el-table-column prop="user_id" label="身份证"></el-table-column>
    <el-table-column prop="status" label="准入状态">
      <template slot-scope="scope">
        <!-- status == 1: inactive; status == 2: active-->
        <i v-if="users[scope.$index].status == 1" class="el-icon-close" style="color: red"></i>
        <i v-if="users[scope.$index].status == 2" class="el-icon-check" style="color: green"></i>
      </template>
    </el-table-column>
    <el-table-column prop="organization" label="所属组织"></el-table-column>
    <el-table-column prop="register_time" label="注册时间"></el-table-column>
    <el-table-column prop="last_login" label="最近登录时间"></el-table-column>
    <el-table-column label="准入权限操作">
      <template slot-scope="scope">
        <el-button
          @click="grantAccessRight(users[scope.$index].user_id)"
          v-if="users[scope.$index].status === 1"
        >准入</el-button>
        <el-button
          @click="revokeAccessRight(users[scope.$index].user_id)"
          v-if="users[scope.$index].status === 2"
        >收回</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'allUser',
  data() {
    return {
      users: []
    }
  },

  methods: {
    grantAccessRight: function(userID) {
      this.$confirm('此操作将赋予用户准入权限，是否继续？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 点击【确定】按钮之后的操作
        .then(() => {
          axios
            .get(
              'http://localhost:9877/ikhnaie/v1/user/access/grant?user_id=' +
                userID
            )
            .then(response => {
              if (response.data.status_code === 200) {
                this.$message.success('授权成功')
              } else {
                this.$message.error('服务器异常，授权失败')
              }
            })
            .catch(response => {
              this.$message.error('请求失败，无法授权')
            })
        })
        // 点击【取消】按钮之后的操作
        .catch(() => {
          this.$message.info('授权操作已取消')
        })
    },

    revokeAccessRight: function(userID) {
      this.$confirm('此操作将吊销用户准入权限，是否继续？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 点击【确定】按钮之后的操作
        .then(() => {
          axios
            .get(
              'http://localhost:9877/ikhnaie/v1/user/access/revoke?user_id=' +
                userID
            )
            .then(response => {
              if (response.data.status_code === 200) {
                this.$message.success('吊销成功')
              } else {
                this.$message.error('服务器异常，吊销失败')
              }
            })
            .catch(response => {
              this.$message.error('请求失败，无法吊销准入权限')
            })
        })
        // 点击【取消】按钮之后的操作
        .catch(() => {
          this.$message.info('吊销操作已取消')
        })
    }
  },

  mounted() {
    axios.get('http://localhost:9877/ikhnaie/v1/user/list').then(response => {
      if (response.data.status_code === 200) {
        this.users = response.data.users
      } else {
        this.$message.error(response.data.status_msg)
      }
    })
  }
}
</script>
