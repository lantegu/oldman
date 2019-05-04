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
      <el-button type="primary" @click="createprecord">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Addprecord',
  data () {
    return {
      precord: {
        sugar: null,
        height: null,
        low: null,
        heart: null,
        idCard: ''
      }
    }
  },
  created () {
    this.precord.idCard = this.$route.params.idCard
  },
  methods: {
    createprecord () {
      var _this = this
      axios.post('/reading/elderPrecord/create', this.precord)
        .then(response => {
          _this.$router.push({name: 'Precords', params: {idCard: _this.precord.idCard}})
        })
    }
  }
}
</script>
