<template>
<div>
  <el-header>
    <el-form :inline="true" :model="findevents" class="demo-form-inline">
      <el-form-item label="故事地点" size="mini">
        <el-input v-model="findevents.place" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="故事内容" size="mini">
        <el-input v-model="findevents.description" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain size="mini"  @click="searchevent">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-header>
  <el-row>
    <el-col>
      <el-button type="primary" icon="el-icon-edit" size="small" @click="addelderevents" >添加老人故事</el-button>
    </el-col>
  </el-row>
  <Eldevent
   v-for=" eldereventdata in eldereventdatas"
   v-bind:key = "eldereventdata.id"
   v-bind:elderevent="eldereventdata"> </Eldevent>
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
import Eldevent from './Eldevent'
export default {
  name: 'Eldevents',
  components: {
    Eldevent
  },
  data () {
    return {
      findevents: {
        place: '',
        description: ''
      },
      eldereventdatas: [],
      idCard: ''
    }
  },
  created () {
    var idCard = this.$route.params.idCard
    this.idCard = idCard
    axios.post('/reading/elderEvent', {
      idCard: idCard
    })
      .then(response => {
        var elderdatas = []
        for (var i = 0; i < response.data.length; i++) {
          var elderdata = response.data[i]
          elderdatas.push(elderdata)
        }
        this.eldereventdatas = elderdatas
      })
      .catch(function (error) {
        alert(error)
      })
  },
  methods: {
    addelderevents () {
      this.$router.push({name: 'Addelderevent', params: {idCard: this.idCard}})
    },
    searchevent () {
      console.log('onSubmit')
    }
  }
}
</script>
