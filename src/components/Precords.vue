<template>
  <div>
    <el-header>
      <el-form :inline="true">
        <el-form-item label="起止时间" prop="searchtime">
          <el-col :span="8">
            <el-date-picker
            size="small"
            v-model="searchtime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-row>
      <el-col>
        <el-button type="primary" icon="el-icon-edit" size="small" @click="addprecord" >添加记录</el-button>
      </el-col>
    </el-row>
    <el-table :data="bodydata.slice((currpage - 1) * pagesize, currpage * pagesize)" stripe border>
      <el-table-column fixed label="序号" width="120">
        <template slot-scope="scope"><span>{{scope.$index+(currpage-1)*pagesize+1}}</span></template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="120"></el-table-column>
      <el-table-column prop="sugar" label="血糖" width="120"></el-table-column>
      <el-table-column prop="pressure" label="血压" width="120"></el-table-column>
      <el-table-column prop="heart" label="心跳"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="updateprecord(scope.row.id)"
        >信息修改</el-button>
        <el-button
          @click="deleteprecord(scope.row.id)"
          type="text"
          size="small"
        >信息删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next, sizes, total, jumper"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="pagesize"
    :total="bodydata.length"
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
</style>

<script>
import axios from 'axios'
export default {
  name: 'Precords',
  inject: ['reload'],
  data () {
    return {
    // 搜索时间
      bodydata: '',
      currpage: 1,
      pagesize: 10,
      searchtime: '',
      idCard: ''
    }
  },
  created () {
    var idCard = this.$route.params.idCard
    this.idCard = idCard
    var url = '/reading/elderPrecord/' + idCard
    axios.get(url)
      .then(response => {
        var bodydatas = []
        for (var i = 0; i < response.data.length; i++) {
          var bodydata = response.data[i]
          var index = bodydata.time.search(/T/)
          bodydata.time = bodydata.time.substring(0, index)
          bodydata.pressure = response.data[i].height + '/' + response.data[i].low
          bodydatas.push(bodydata)
        }
        this.bodydata = bodydatas
      })
  },
  methods: {
    updateprecord (id) {
      this.$router.push({name: 'UpdatePrecord', params: {id: id}})
    },
    deleteprecord (id) {
      var _this = this
      var url = '/reading/elderPrecord/delete/' + id
      axios.delete(url)
        .then(response => {
          _this.reload()
        })
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    setyear (mydate) {
      var dateyear = mydate.getFullYear()
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
    search () {
      var sendmessage = {
        'minyear': '',
        'maxyear': '',
        'idCard': ''}
      sendmessage.minyear = this.setyear(this.searchtime[1])
      sendmessage.maxyear = this.setyear(this.searchtime[0])
      sendmessage.idCard = this.idCard
      axios.post('/reading/elderPrecord/search', sendmessage)
        .then(response => {
          var bodydatas = []
          for (var i = 0; i < response.data.length; i++) {
            var bodydata = response.data[i]
            var index = bodydata.time.search(/T/)
            bodydata.time = bodydata.time.substring(0, index)
            bodydata.pressure = response.data[i].height + '/' + response.data[i].low
            bodydatas.push(bodydata)
          }
          this.bodydata = bodydatas
        })
    },
    addprecord () {
      this.$router.push({name: 'Addprecord', params: {idCard: this.idCard}})
    }
  }
}
</script>
