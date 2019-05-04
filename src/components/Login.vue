<template>
  <div>
  <el-header>
  </el-header>
  <el-main>
    <el-row type="flex" justify="center">
        <el-form :model="user" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="user.loginname"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                    <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-row>
  </el-main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    login () {
      var _this = this
      axios.post('/reading/account', this.user)
        .then(response => {
          _this.$router.push({name: 'Home'})
        })
        .catch(function (error) {
          if (error.message === 'Request failed with status code 504') {
            _this.$message.error('网络错误')
          }
        })
    }
  },
  data () {
    return {
      user: {
        loginname: 'gulante',
        password: 'password123'
      }
    }
  }
}
</script>
