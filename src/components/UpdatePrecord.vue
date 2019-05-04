<template>
  <div>
    <el-form :model="precord" ref="precord" label-width="100px" class="Addprecord">
      <el-row>
        <el-col :span="8">
          <el-form-item label="血糖">
            <el-input v-model.number="precord.sugar" size="small" placeholder="毫摩尔/升"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="舒张压">
            <el-input v-model.number="precord.height" size="small" placeholder="mmhg"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="收缩压">
            <el-input v-model.number="precord.low" size="small" placeholder="mmhg"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="心跳">
            <el-input v-model.number="precord.heart" size="small" placeholder="次/分"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
      <el-button type="primary" @click="updateprecord">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UpdatePrecord',
  data () {
    return {
      precord: {
        sugar: null,
        height: null,
        low: null,
        heart: null,
        id: ''
      },
      idCard: ''

    }
  },
  created () {
    this.precord.id = this.$route.params.id
    var url = '/reading/elderPrecord/readprecord/' + this.precord.id
    axios.get(url)
      .then(response => {
        this.precord = response.data
        this.idCard = response.data.elder.idCard
      })
  },
  methods: {
    updateprecord () {
      var _this = this
      axios.post('/reading/elderPrecord/update', this.precord)
        .then(response => {
          _this.$router.push({name: 'Precords', params: {idCard: _this.idCard}})
        })
    }
  }
}
</script>
