<template>
 <div>
  <el-form :model="userinfo" :rules="rules" ref="userinfo" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :span="5">
          <el-upload
          list-type="picture-card"
          :headers="myHeaders"
          ref="upload"
          class="avatar-uploader"
          action="string"
          :on-change="imageChange"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeAvatarUpload">
          <img v-if="avatarUrl!==null" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-col>
    </el-row>
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
            <el-input v-model="userinfo.idCard" :disabled="true"></el-input>
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
    <el-button type="primary" @click="updateelder('userinfo')">创建/更新</el-button>
    <el-button @click="resetForm('userinfo')">重置</el-button>
  </el-form-item>
  </el-form>
</div>
</template>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>

<script>
import axios from 'axios'
import COS from 'cos-js-sdk-v5'
export default {
  name: 'Eldermessage',
  inject: ['reload'],
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
      myHeaders: {CacheControl: 'no-cache'},
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
        pension: '',
        avatar: null
        // 届时连同表单一起传输
      },
      avatarUrl: null,
      file: null,
      cos: null,
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
    handlePictureCardPreview (file) {
      console.log(file.url)
    },
    imageChange (file, fileList, name) {
      this.avatarUrl = file.url
      this.file = file
    },
    handleAvatarSuccess (res, file) {
      console.log('success')
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 创建老人
    updateelder (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var idCard = this.userinfo.idCard
          var url = '/reading/elderBasedInfo/updateInfo/' + idCard
          // 头像上传处理
          if (this.file) {
            var getcos = {
              'action': ['name/cos:PutObject',
                'name/cos:PostObject',
                'name/cos:InitiateMultipartUpload',
                'name/cos:ListMultipartUploads',
                'name/cos:ListParts',
                'name/cos:UploadPart',
                'name/cos:CompleteMultipartUpload'],
              'bucket': 'elder-1259014786',
              'region': 'ap-shanghai',
              'prefix': '*'
            }
            var _this = this
            _this.cos = new COS({
              getAuthorization: function (options, callback) {
                // 异步获取临时密钥
                axios.post('http://127.0.0.1:3001/kexpress/v1/user/imageUpload/getcos', getcos)
                  .then(response => {
                    /* eslint-disable */
                  callback({
                    TmpSecretId: response.data.credentials.tmpSecretId,
                    TmpSecretKey: response.data.credentials.tmpSecretKey,
                    XCosSecurityToken: response.data.credentials.sessionToken,
                    ExpiredTime: response.data.expiredTime
                  })
                   /* eslint-disable */
                })
            }
          })
          var dir = this.userinfo.id +'/idphoto';
          _this.cos.sliceUploadFile({
            Bucket: getcos.bucket,
            Region: getcos.region,
            Key: dir,
            Body: this.file.raw,
        }, function (err, data) {
            if(data) {
            _this.avatarUrl = 'https://' + data.Location
            axios.post('/reading/imageUpload',{url:_this.avatarUrl})
              .then(response =>{
                _this.userinfo.avatar = response.data
                axios.post(url, _this.userinfo)
                  .then(function (response) {
                  console.log(response)
                  })
                    .finally(() => {
                      _this.backUsermessage()
                    })
              })
            }
        });
        }
        else {
        axios.post(url, this.userinfo)
          .then(function (response) {
            console.log(response)
          })
          .finally(() => {
            this.backUsermessage()
          })
        }
        } else {
          alert('error submit')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    var idCard = this.$route.params.idCard
    var url = '/reading/elderBasedInfo/getInfo/' + idCard
    var _this = this
    axios.get(url)
      .then(function (response) {
        var index = response.data.birthday.search(/T/)
        var newbirthday = response.data.birthday.substring(0, index)
        var newDate = new Date(newbirthday)
        _this.userinfo = response.data
        _this.userinfo.birthday = newDate
        if (_this.userinfo.avatar) {
          _this.avatarUrl = _this.userinfo.avatar.url
        }
      })
  }
}
</script>
