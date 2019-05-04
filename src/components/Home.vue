<template>
<div>
<el-container>
      <el-header>
        <el-col :span="4">
          <img src="../assets/logo.png">
        </el-col>
        <el-col :span="10">
          <el-input v-model="input" placeholder="查询内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-header>
    </el-container>
    <!-- 主体容器 -->
    <el-container style="height: 500px; border: 1px solid #eee">
      <!-- 导航部分 -->
      <el-aside style="width:200px">
        <el-menu :default-openeds="['1', '4']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>长辈管理
            </template>
              <el-menu-item index="1-1" >
                <el-button type="text" @click="getUsermessage">长辈综合信息管理</el-button>
                </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>导航二
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 中间容器 -->
      <el-container>
        <el-main>
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #fff;
  color: #fff;
  line-height: 60px;
  padding: 10px 20px;
}
.el-aside {
  color: #333;
  background-color: rgb(238, 241, 246);
}

.router-link {
  color: black;
}

.el-container {
  background-color: #fff;
}
.el-col {
  line-height: 40px;
  background-color: #fff;
}
</style>

<script>
// import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      input: '',
      isRouterAlive: true
    }
  },
  methods: {
    getUsermessage () {
      this.$router.push({name: 'Usermessage'})
    }
  }
}
</script>
