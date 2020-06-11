<template>
  <div>
    <div id="product">
      <h3 style="color: green">农产品信息</h3>
      <table border="1" style="margin: auto">
        <tr>
          <th>农产品名</th>
          <th>规格</th>
          <th>产地</th>
          <th>生产商</th>
          <th>生产日期</th>
          <th>保质期</th>
          <th>生产许可证编号</th>
          <th>生产批次号</th>
          <th>描述</th>
        </tr>
        <tr>
          <td>{{ product.name }}</td>
          <td>{{ product.specification }}</td>
          <td>{{ product.region }}</td>
          <td>{{ product.mfrs_name }}</td>
          <td>{{ product.mfg_date }}</td>
          <td>{{ product.exp_date }}</td>
          <td>{{ product.qsid }}</td>
          <td>{{ product.lot }}</td>
          <td>{{ product.description }}</td>
        </tr>
      </table>
    </div>
    <div id="history">
      <h3 style="color: green">交易历史</h3>
      <el-table :data="history" stripe style="width: 100%">
        <el-table-column prop="trade_time" label="交易时间"></el-table-column>
        <el-table-column prop="trade_place" label="交易地点"></el-table-column>
        <el-table-column prop="seller_name" label="卖家名"></el-table-column>
        <el-table-column prop="seller_id" label="卖家身份证号"></el-table-column>
        <el-table-column prop="buyer_name" label="买家名"></el-table-column>
        <el-table-column prop="buyer_id" label="买家身份证号"></el-table-column>
        <el-table-column prop="number" label="交易数目"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      product: '',
      history: []
    }
  },

  mounted() {
    axios
      .get(
        'http://localhost:9877/ikhnaie/v1/qrcode/retrieve?food_id=' +
          this.$route.params.food_id
      )
      .then(response => {
        if (response.data.status_code === 200) {
          this.$message.success('请求成功')
          this.product = response.data.product
          this.history = response.data.history
        } else {
          this.$message.error('服务器打瞌睡了...')
        }
      })
      .catch(() => {
        this.$message.error('请求失败')
      })
  }
}
</script>

<style>
.product {
  text-align: center;
  vertical-align: middle;
}
</style>
