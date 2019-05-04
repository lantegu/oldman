<template>
  <div>
  <el-header >
    <el-form :inline="true" :model="selects" class="demo-form-inline" >
      <el-form-item label="长辈姓名" size="mini">
        <el-input v-model="selects.name" placeholder="搜索长辈姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" size="mini">
          <el-select v-model="selects.gender" placeholder="选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="年龄跨度" size="mini">
          <el-input  v-model="selects.minyear" style="width: 60px"></el-input>
      </el-form-item>
      <el-form-item label="-" size="mini">
          <el-input  v-model="selects.maxyear" style="width: 60px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchgElder" size="mini">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-header>
  <el-row>
    <el-col>
      <el-button type="primary" @click="addelders">添加老人</el-button>
    </el-col>
  </el-row>
  <el-table :data="elderData.slice((currpage - 1) * pagesize, currpage * pagesize)" stripe border>
    <el-table-column fixed label="序号" width="120">
      <template slot-scope="scope"><span>{{scope.$index+(currpage-1)*pagesize+1}}</span></template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="gender" label="性别" width="120"></el-table-column>
    <el-table-column prop="birthday" label="出生年月" width="120"></el-table-column>
    <el-table-column prop="idCard" label="身份证号"></el-table-column>
    <el-table-column prop="census" label="籍贯"></el-table-column>
    <el-table-column fixed="right" label="操作" width="300">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="detailmessage(scope.row.idCard)"
        >信息查看</el-button>
        <el-button
          @click="eventcontrol(scope.row.idCard)"
          type="text"
          size="small"
        >故事管理</el-button>
        <el-button
        @click="getprecord(scope.row.idCard)"
        type="text"
        size="small"
        >体征管理</el-button>
        <el-button
          @click="deleteElder(scope.row.idCard)"
          type="text"
          size="small"
        >老人删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next, sizes, total, jumper"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="pagesize"
    :total="elderData.length"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  ></el-pagination>
  </div>
</template>
<style>
.el-header {
  background-color: #fff;
  color: #fff;
  line-height: 20px;
  padding: 10px 20px;
}
.el-row {
    margin-bottom: 20px;
  }
.el-col {
    border-radius: 4px;
  }
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
 .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>

<script>
import axios from 'axios'
export default {
  name: 'Usermessage',
  inject: ['reload'],
  data () {
    return {
      elderData: [],
      pagesize: 10,
      currpage: 1,
      // 对长辈信息进行二次筛选
      selects: {
        loginname: 'gulante',
        name: '',
        gender: '',
        minyear: 0,
        maxyear: 130
      }
    }
  },
  created: function () {
    var _this = this
    // 获取用户列表
    axios.post('/reading/elderBasedInfo', {
      loginname: 'gulante'
    })
      .then(response => {
        var elderdatas = []
        for (var i = 0; i < response.data.length; i++) {
          var elderdata = response.data[i]
          delete elderdata.id
          var index = response.data[i].birthday.search(/T/)
          var newbirthday = response.data[i].birthday.substring(0, index)
          response.data[i].birthday = newbirthday
          elderdatas.push(elderdata)
        }
        this.elderData = elderdatas
      })
      .catch(function (error) {
        if (error.message === 'Request failed with status code 504') {
          _this.$message.error('网络错误')
        }
      })
  },
  methods: {
    getprecord (idCard) {
      this.$router.push({name: 'Precords', params: { idCard: idCard }})
    },
    detailmessage (idCard) {
      this.$router.push({name: 'Eldermessage', params: { idCard: idCard }})
    },
    deleteElder (idCard) {
      var url = '/reading/elderBasedInfo/deleteInfo/' + idCard
      axios.get(url)
        .then(function (response) {
          console.log(response)
        })
        .finally(() => {
          this.reload()
        })
    },
    // 转向添加老人
    addelders () {
      this.$router.push({name: 'Addelder'})
    },
    eventcontrol (idCard) {
      this.$router.push({name: 'Eldevents', params: {idCard: idCard}})
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    setyear (year) {
      var mydate = new Date()
      var dateyear = mydate.getFullYear() - year
      var month = mydate.getMonth() + 1
      var day = mydate.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      var dateString = dateyear + '-' + month + '-' + day
      return dateString
    },
    searchgElder () {
      var sendmessage = {
        loginname: '',
        name: '',
        gender: '',
        minyear: 0,
        maxyear: 130}
      sendmessage.loginname = this.selects.loginname
      sendmessage.name = this.selects.name
      sendmessage.gender = this.selects.gender
      sendmessage.minyear = this.setyear(this.selects.minyear)
      sendmessage.maxyear = this.setyear(this.selects.maxyear)
      console.log(sendmessage)
      axios.post('/reading/elderBasedInfo', sendmessage)
        .then(response => {
          var elderdatas = []
          for (var i = 0; i < response.data.length; i++) {
            var elderdata = response.data[i]
            delete elderdata.id
            var index = response.data[i].birthday.search(/T/)
            var newbirthday = response.data[i].birthday.substring(0, index)
            response.data[i].birthday = newbirthday
            elderdatas.push(elderdata)
          }
          this.elderData = elderdatas
        })
        .finally(() => {
        })
    }
  }
}
</script>
