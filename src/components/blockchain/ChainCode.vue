<template>
  <el-table :data="chaincodes" stripe style="width: 100%">
    <el-table-column prop="name" label="链码名"></el-table-column>
    <el-table-column prop="version" label="版本"></el-table-column>
    <el-table-column prop="path" label="路径"></el-table-column>
    <el-table-column prop="id" label="标识"></el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      chaincodes: []
    }
  },

  mounted() {
    axios
      .get('http://localhost:9877/ikhnaie/v1/blockchain/chaincode/list')
      .then(response => {
        if (response.data.status_code === 200) {
          this.$message.success('获取链码成功')
          this.chaincodes = response.data.chaincodes
        } else {
          this.$message.error(response.data.status_msg)
        }
      })
      .catch(() => {
        this.$message.error('请求失败')
      })
  }
}
</script>
