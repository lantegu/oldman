<template>
<div>
  <el-form :model="userinfo" :rules="rules" ref="userinfo" label-width="100px" class="demo-ruleForm">
    <el-row >
      <el-col :span="5">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userinfo.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5" :offset="3">
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="userinfo.gender" label="男">男</el-radio>
          <el-radio v-model="userinfo.gender" label="女">女</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="6" :offset="2">
      <el-form-item label="出生年月" required>
          <el-form-item prop="birthday">
            <el-date-picker type="date" placeholder="选择出生日期" v-model="userinfo.birthday" style="width: 100%;" :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
      </el-form-item>
      </el-col>
    </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="户籍">
            <el-input v-model="userinfo.census"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="民族">
            <el-input v-model="userinfo.nation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="userinfo.idCard"></el-input>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row >
      <el-col :span="5">
        <el-form-item label="体重" prop="weight">
          <el-input v-model.number="userinfo.weight" placeholder="单位kg"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5" :offset="3">
        <el-form-item label="身高" prop="height">
          <el-input v-model.number="userinfo.height" placeholder="单位cm"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-form-item label="婚姻情况">
          <el-select v-model="userinfo.marriage" placeholder="请选择婚姻情况">
            <el-option v-for="item in marriages" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="子女数">
          <el-input v-model.number="userinfo.numOfLivingChildren"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5" :offset="3">
        <el-form-item label="文化程度" prop="edutionalLevel">
          <el-select v-model="userinfo.edutionalLevel" placeholder="请选择文化程度">
            <el-option v-for="item in educations" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-form-item label="宗教">
          <el-input v-model="userinfo.religion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item label="职业">
          <el-input v-model="userinfo.career"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5" :offset="3">
        <el-form-item label="医疗保险">
          <el-input v-model="userinfo.medInsurance"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5" :offset="3">
        <el-form-item label="养老保险">
          <el-input v-model="userinfo.pension"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
    <el-button type="primary" @click="createelder('userinfo')">创建/更新</el-button>
    <el-button @click="resetForm('userinfo')">重置</el-button>
  </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddElder',
  components: {
    axios
  },
  data () {
    var checkweight = (rule, value, callback) => {
      if (value && !Number.isInteger(value)) {
        return callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      marriages: [{
        value: 'married',
        label: '已婚'
      }, {
        value: 'unmarried',
        label: '未婚'
      }, {
        value: 'widowed',
        label: '丧偶'
      }
      ],
      educations: [{
        value: 'illiteracy',
        label: '文盲'
      }, {
        value: 'primaryschool',
        label: '小学'
      }, {
        value: 'middle school',
        label: '中学'
      }, {
        value: 'university',
        label: '大学及以上'
      }],
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      userinfo: {
      // 姓名，性别，生日，身份证，体重，身高，民族，婚姻，子女，户籍，文化，宗教，职业，医保，养保，创建时间，更新时间，头像
        name: '',
        gender: '',
        birthday: '',
        census: '',
        nation: '',
        idCard: '',
        weight: 0,
        height: 0,
        marriage: '',
        numOfLivingChildren: 0,
        edutionalLevel: '',
        religion: '无',
        career: '',
        medInsurance: '',
        pension: ''
        // createtime: '',
        // upatetime: '',
        // avatar: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '名字应在2到10个字符', trigger: 'blur'}
        ],
        birthday: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
        ],
        idCard: [
          {required: true, message: '请填写身份证号', trigger: 'blur'},
          {min: 18, max: 18, message: '身份证应为18位', trigger: 'blur'}
        ],
        weight: [
          {validator: checkweight, trigger: 'blur'}
        ],
        height: [
          {validator: checkweight, trigger: 'blur'}
        ],
        numOfLivingChildren: [
          {validator: checkweight, trigger: 'blur'}
        ]
      },
      datepick: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    backUsermessage () {
      this.$router.push({name: 'Usermessage'})
    },
    // 返回添加列表
    // 创建老人
    createelder (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/reading/elderBasedInfo/addElder', this.userinfo)
            .then(function (response) {
              console.log(response)
            })
            .finally(() => {
              this.backUsermessage()
            })
        } else {
          alert('error submit')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
