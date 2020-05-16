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
      console.log(userID)
      axios
        .get(
          'http://localhost:9877/ikhnaie/v1/user/access/grant?user_id=' + userID
        )
        .then(response => {})
    },

    revokeAccessRight: function(userID) {
      console.log(userID)
      axios
        .get('http://localhost:9877/ikhnaie/v1/user/access/revoke', {
          user_id: userID
        })
        .then(response => {})
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
