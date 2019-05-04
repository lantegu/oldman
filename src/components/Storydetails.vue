<template>
  <div>
    <el-row>
      <el-col :span="8">故事标题     {{storydetail.title}}</el-col>
    </el-row>
    <el-row>
      <el-col >故事时间    {{storydetail.startTime}} 至  {{storydetail.endTime}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="8">故事地点    {{storydetail.place}} </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">主人公    {{storydetail.host}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="8">参与人物    {{storydetail.partner}}</el-col>
    </el-row>
    <el-row>
      <el-col >
        故事内容    {{storydetail.description}}
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="demo-image">
          <div class="block" v-for="url in imageUrl" :key="url">
            <img
              style="width: 100px; height: 100px"
              :src="url"
              fit= 'fill'>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Storydetails',
  data () {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      imageUrl: [],
      storydetail: {
        title: '',
        startTime: '',
        endTime: '',
        place: '',
        host: '',
        partner: '',
        description: ''
      }
    }
  },
  created () {
    var eventid = this.$route.params.id
    var url = '/reading/elderEvent/getdetail/' + eventid
    var _this = this
    axios.get(url)
      .then(function (response) {
        console.log(response.data)
        _this.storydetail = response.data
        var index1 = response.data.startTime.search(/T/)
        var startime = response.data.startTime.substring(0, index1)
        var index2 = response.data.endTime.search(/T/)
        var endtime = response.data.endTime.substring(0, index2)
        _this.imageUrl = response.data.imageUrl
        _this.storydetail.startTime = startime
        _this.storydetail.endTime = endtime
        _this.storydetail.host = response.data.elder.name
      })
  }
}
</script>
