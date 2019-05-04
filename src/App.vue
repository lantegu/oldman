<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
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
// 由于数据是从后端获取分发到每个路由中因此目前不用担心
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
