<template>
<div>
  <el-form ref="addeldervent" :rules="rules" :model="eventdata" label-width="80px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="故事标题" prop="title">
          <el-input  v-model="eventdata.title" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="3">
        <el-form-item label="心情" prop="mood">
          <el-select v-model="eventdata.mood" placeholder="请选择情绪">
            <el-option label="开心" value="开心"></el-option>
            <el-option label="难过" value="难过"></el-option>
            <el-option label="平淡" value="平淡"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="故事地点" prop="place">
          <el-input  v-model="eventdata.place" size="small"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="故事时间" prop="time" required>
      <el-col :span="8">
        <el-date-picker
        size="small"
        v-model="eventdata.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="故事人物" prop="partner">
        <el-col :span="8">
          <el-input  v-model="eventdata.partner" size="small"></el-input>
        </el-col>
    </el-form-item>
    <el-form-item label="故事内容" prop="description">
      <el-col :span="18">
        <el-input  type="textarea" v-model="eventdata.description" :rows="5"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitevent('addeldervent')">提交</el-button>
      <el-button @click="test">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Updateevent',
  components: {
    axios
  },
  data () {
    return {
      eventdata: {
        title: '',
        time: '',
        startTime: '',
        endTime: '',
        place: '',
        partner: '',
        mood: '',
        description: '今天完成开题报告'
      },
      idCard: '',
      eventid: '',
      elderid: '',
      rules: {
        title: [
          {required: true, message: '请输入故事标题', trigger: 'blur'}
        ],
        place: [
          {required: true, message: '请输入故事地点', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入故事内容', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    var eventid = this.$route.params.id
    this.eventid = eventid
    var url = '/reading/elderEvent/getdetail/' + eventid
    var _this = this
    axios.get(url)
      .then(function (response) {
        _this.eventdata = response.data
        var index1 = response.data.startTime.search(/T/)
        var startime = response.data.startTime.substring(0, index1)
        var index2 = response.data.endTime.search(/T/)
        var endtime = response.data.endTime.substring(0, index2)
        var date = []
        date.push(new Date(startime))
        date.push(new Date(endtime))
        _this.eventdata.time = date
        _this.eventdata.startTime = startime
        _this.eventdata.endTime = endtime
        _this.elderid = response.data.elder.id
      })
  },
  methods: {
    test () {
      console.log(this.eventdata.time)
    },
    // 日期格式转化
    DatetoString (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      var dateString = year + '-' + month + '-' + day
      return dateString
    },
    // 将日期转化封装起来便于promise
    gettime () {
      this.eventdata.startTime = this.DatetoString(this.eventdata.time[0])
      this.eventdata.endTime = this.DatetoString(this.eventdata.time[1])
    },
    // 添加老人事件
    submitevent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 对时间进行格式转化
          var _this = this
          this.gettime()
          var eventid = this.eventid
          var url = '/reading/elderEvent/update/' + eventid
          axios.post(url, this.eventdata)
            .then(function (response) {
              _this.$router.push({name: 'Eldevents', params: {idCard: response.data.idCard}})
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>
