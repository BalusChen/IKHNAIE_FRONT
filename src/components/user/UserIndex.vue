<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu default-active="0" :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>个人信息
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">TODO-1</el-menu-item>
            <el-menu-item index="1-2">TODO-2</el-menu-item>
            <el-menu-item index="1-3">未准入用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>农产品管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" :route="{name: 'ProductList'}">所有农产品</el-menu-item>
            <el-menu-item index="2-2" :route="{name: 'ProductAdd'}">添加农产品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>管理-TODO2
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">TODO-1</el-menu-item>
            <el-menu-item index="3-2">TODO-2</el-menu-item>
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
        <span>用户</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3d1bd;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import moment from 'moment'
export default {
  methods: {},

  mounted() {
    console.log('user cookies:', this.$cookies.get('user'))
    console.log(new Date())
    console.log(moment(new Date()).format('YYYY-MM-DD'))
  }
}
</script>
