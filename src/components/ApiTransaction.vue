<template>
    <div id="transaction">
      <div id="product_info">
        <table border="1">
          <tr>
            <th>序列号</th>
            <th>农产品名</th>
            <th>产地</th>
            <th>生产日期</th>
            <th>保质期</th>
          </tr>
          <tr>
            <td>{{ product_info.food_id }}</td>
            <td>{{ product_info.food_name }}</td>
            <td>{{ product_info.birth_address }}</td>
            <td>{{ product_info.birthday }}</td>
            <td>{{ product_info.shelf_life }}天</td>
          </tr>
        </table>
      </div>
      <div id="transaction_history">
        <table border="1">
            <tr>
                <th>交易时间</th>
                <th>交易地点</th>
                <th>售卖者</th>
                <th>售卖者 ID</th>
                <th>购买者</th>
                <th>购买者 ID</th>
                <th>数目</th>
                <th>单价</th>
            </tr>
            <tr v-for="record in transaction_history" :key="record.trade_time">
                <td>{{ record.trade_time }}</td>
                <td>{{ record.trade_place }}</td>
                <td>{{ record.seller_name }}</td>
                <td>{{ record.seller_id }}</td>
                <td>{{ record.buyer_name }}</td>
                <td>{{ record.buyer_id }}</td>
                <td>{{ record.number }}</td>
                <td>￥{{ record.price }}</td>
            </tr>
        </table>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'apitransaction',
  data () {
    return {
        product_info: null,
        transaction_history: null
    }
  },

  methods: {
  },

  mounted () {
    axios
      .get('http://localhost:9877/ikhnaie/v1/transaction/history')
      .then(response => {
        alert(response)
        this.product_info = response.data.product_info
        this.transaction_history = response.data.transaction_history
      }, error => {
        console.log('request transaction history failed: ', error)
      })
  }
}
</script>
