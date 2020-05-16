<template>
  <el-table :data="users">
    <el-table-column prop="user_name" label="用户名"></el-table-column>
    <el-table-column prop="user_id" label="身份证"></el-table-column>
    <el-table-column prop="status" label="准入状态"></el-table-column>
    <el-table-column prop="organization" label="所属组织"></el-table-column>
    <el-table-column prop="register_time" label="注册时间"></el-table-column>
    <el-table-column prop="last_login" label="最近登录时间"></el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'allUser',
  data() {
    return {
      users: ''
    }
  },

  mounted() {
    axios.get('http://localhost:9877/ikhnaie/v1/user/list').then(response => {
      console.log(response.data)
      if (response.data.status_code === 200) {
        this.users = response.data.users
      } else {
        this.$message.error(response.data.status_msg)
      }
    })
  }
}
</script>
