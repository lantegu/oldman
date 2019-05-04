<template>
  <div>
    <el-row>
      <el-col :span="5">故事标题:   {{title}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">故事时间：  {{startTime}}</el-col>
      <el-col :span="5" :offset="4">故事地点：  {{place}}</el-col>
      <el-col :span="5" :offset="4">人物情绪：  {{mood}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5" >故事内容:    {{description}}</el-col>
      <el-col :span="5" :offset="4">
        <el-button type="primary"  @click="getdetail" size="small">详情</el-button>
        <el-button type="primary" @click= "update" size="small">修改</el-button>
        <el-button type="danger" @click="deleteevent" size="small">删除></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Eldevent',
  props: ['elderevent'],
  inject: ['reload'],
  data () {
    return {
      id: this.elderevent.id,
      title: this.elderevent.title,
      startTime: this.elderevent.startTime,
      mood: this.elderevent.mood,
      place: this.elderevent.place,
      partner: this.elderevent.partner,
      description: this.elderevent.description
    }
  },
  created () {
    const time = this.elderevent.startTime
    var index = time.search(/T/)
    var startime = time.substring(0, index)
    this.startTime = startime
  },
  methods: {
    getdetail () {
      this.$router.push({name: 'Storydetails', params: { id: this.id }})
    },
    update () {
      this.$router.push({name: 'Updateevent', params: {id: this.id}})
    },
    deleteevent () {
      var eventid = this.id
      var _this = this
      var url = '/reading/elderEvent/delete/' + eventid
      axios.delete(url)
        .then(function (respose) {
          _this.reload()
        })
    }
  }
}
</script>
