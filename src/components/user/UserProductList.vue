<template>
  <el-row>
    <el-col :span="4" v-for="(product, index) in this.products" :key="index" :offset="1">
      <el-card
        :body-style="{ padding: '0px', height: '360px'}"
        shadow="hover"
        style="width: 260px; height: 320px;"
      >
        <div style="padding: 6px; height: 210px">
          <div style="position: relative; top: 30px;">
            <img :src="product.image_url" class="image" />
          </div>

          <div style="position: relative; top: 45px;">
            <span>{{product.name}}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">详情</el-button>
              <el-button type="text" class="button">交易</el-button>
              <el-button
                type="text"
                @click="showTransactionHistory('0000001')"
                class="button"
              >查看交易历史</el-button>
              <el-button type="text" class="button">生成二维码</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'allUser',
  data() {
    return {
      products: [],
      history: []
    }
  },

  methods: {
    showTransactionHistory(foodID) {
      console.log('foodID: ', foodID)
      axios
        .get(
          'http://localhost:9877/ikhnaie/v1/transaction/history?food_id=0000001'
        )
        .then(response => {
          console.log(response.data)

          if (response.data.status_code === 200) {
            this.history = response.data.transaction_history
          } else {
            this.$message.error(response.data.status_msg)
          }
        })
    }
  },

  mounted() {
    axios
      .get(
        'http://localhost:9877/ikhnaie/v1/product/list?owner_id=' +
          this.$cookies.get('user').user_id
      )
      .then(response => {
        if (response.data.status_code === 200) {
          this.products = response.data.products
        } else {
          this.$message.error(response.data.status_msg)
        }
      })
  }
}
</script>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100px;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
