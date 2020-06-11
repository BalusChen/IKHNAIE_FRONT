<template>
  <el-form ref="form" :model="product" label-width="120px" align="left">
    <el-form-item label="农产品名称">
      <el-input v-model="product.name" name="name"></el-input>
    </el-form-item>

    <el-form-item label="规格">
      <el-input v-model="product.spec" name="spec"></el-input>
    </el-form-item>

    <el-form-item label="生产地区">
      <el-select v-model="product.region" name="region" placeholder="请选择产地">
        <el-option label="北京" value="北京"></el-option>
        <el-option label="上海" value="上海"></el-option>
        <el-option label="广州" value="广州"></el-option>
        <el-option label="深圳" value="深圳"></el-option>
        <el-option label="南昌" value="南昌"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="生产商">
      <el-input v-model="product.mfrs_name" name="mfrs_name"></el-input>
    </el-form-item>

    <el-form-item label="生产时间">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        name="mfg_date"
        value-format="yyyy-MM-dd"
        v-model="product.mfg_date"
        style="width: 100%;"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="保质期">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        name="exp_date"
        value-format="yyyy-MM-dd"
        v-model="product.exp_date"
        style="width: 100%;"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="生产许可证编号">
      <el-input v-model="product.qsid" name="qsid"></el-input>
    </el-form-item>

    <el-form-item label="生产批次号">
      <el-input v-model="product.lot" name="lot"></el-input>
    </el-form-item>

    <el-form-item label="产品描述">
      <el-input type="textarea" v-model="product.desc" name="desc"></el-input>
    </el-form-item>

    <el-form-item label="上传产品图片">
      <el-upload
        v-model="product.image"
        class="upload-demo"
        drag
        action="#"
        :before-upload="beforeUpload"
        :limit="1"
        accept="image/jpg"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addProduct()">添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      product: {
        name: '',
        spec: '',
        region: '',
        mfrs_name: '',
        mfg_date: '',
        exp_date: '',
        qsid: '',
        lot: '',
        desc: '',
        image: ''
      }
    }
  },

  methods: {
    handleFile: function(response, file, fileList) {
      this.product.image = file
    },

    beforeUpload: function(file) {
      this.product.image = file
      return false
    },

    addProduct() {
      console.log('image', this.product.image)

      var fd = new FormData()
      fd.append('name', this.product.name)
      fd.append('owner_id', this.$cookies.get('user').user_id)
      fd.append('specification', this.product.spec)
      fd.append('region', this.product.region)
      fd.append('mfrs_name', this.product.mfrs_name)
      fd.append('mfg_date', this.product.mfg_date)
      fd.append('exp_date', this.product.exp_date)
      fd.append('qsid', this.product.qsid)
      fd.append('lot', this.product.lot)
      fd.append('description', this.product.desc)
      fd.append('image', this.product.image)

      axios
        .post('http://localhost:9877/ikhnaie/v1/product/add', fd, {
          'Content-Type': 'multipart/form-data'
        })
        .then(response => {
          if (response.data.status_code === 200) {
            this.$message.success('添加农产品成功')
          } else {
            this.$message.error('添加农产品失败：', response.data.status_msg)
          }
        })
        .catch(() => {
          this.$message.error('请求失败')
        })
    }
  }
}
</script>
