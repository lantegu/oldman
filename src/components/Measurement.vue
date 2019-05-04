<template>
  <div>
    <el-header>
      <el-form :inline="true" :model="selects" class="demo-form-inline" >
        <el-form-item label="长辈姓名" size="mini">
          <el-input v-model="selects.name" placeholder="搜索长辈姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
            <el-select v-model="selects.sex" placeholder="选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="年龄跨度" size="mini">
            <el-input  v-model="selects.minyear" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item label="-" size="mini">
            <el-input  v-model="selects.maxyear" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-table :data="elderData.slice((currpage - 1) * pagesize, currpage * pagesize)" stripe border>
    <el-table-column fixed label="序号" width="120">
      <template slot-scope="scope"><span>{{scope.$index+(currpage-1)*pagesize+1}}</span></template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="gender" label="性别" width="120"></el-table-column>
    <el-table-column prop="birthday" label="年龄" width="120"></el-table-column>
    <el-table-column prop="idCard" label="身份证号"></el-table-column>
    <el-table-column prop="census" label="籍贯"></el-table-column>
    <el-table-column fixed="right" label="操作" width="240">
      <template slot-scope="scope">
        <el-button
          v-on:click="$emit('add-elders',scope.row.name)"
          type="text"
          size="small"
        >查看记录</el-button >
        <router-link :to="{name: 'Precords',params: { idCard: scope.row.idCard }}">个人数据测量</router-link>
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
const item = {
  name: '张三',
  gender: '男',
  birthday: '20',
  idCard: '330328199809091100',
  census: '浙江省绍兴市'
}
export default {
  name: 'Measurement',
  components: {
  },
  data () {
    return {
      pagesize: 10,
      currpage: 1,
      elderData: Array(20).fill(item),
      selects: {
        name: '',
        gender: '',
        minyear: 0,
        maxyear: 130
      }
    }
  },
  methods: {
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    logmessage (message) {
      console.log(message)
    },
    search () {
      console.log('search')
    }
  }
}
</script>
