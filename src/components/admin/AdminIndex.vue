<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu default-active="0" :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>用户管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" :route="{name: 'UserList'}">所有用户</el-menu-item>
            <el-menu-item index="1-2">已准入用户</el-menu-item>
            <el-menu-item index="1-3">未准入用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>区块链管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">链码状况</el-menu-item>
            <el-menu-item index="2-2">链上组织</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>个人信息
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">TODO1</el-menu-item>
            <el-menu-item index="3-2">TODO2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: '2020-05-15',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },

  methods: {
    doAlert() {
      alert('fuck you')
    }
  }
}
</script>
