<template>
  <div>
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
                <el-button type="text" class="button" @click="dialogVisibleDetail = true">详情</el-button>
                <el-button type="text" class="button" @click="beforeTransaction(product.id)">交易</el-button>
                <el-button
                  type="text"
                  class="button"
                  @click="showTransactionHistory(product.id)"
                >查看交易历史</el-button>
                <el-button type="text" @click="generateQRCode(product.id)" class="button">生成二维码</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div>
      <el-dialog title="详情" :visible.sync="dialogVisibleDetail" width="50%">
        <el-table :data="history" stripe style="width: 100%">
          <!-- TODO: which data to bind? -->
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDetail= false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleDetail= false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="交易" :visible.sync="dialogVisibleTransaction" width="30%">
        <el-form ref="form" :model="product" label-width="120px" align="left">
          <el-form-item label="买家名">
            <el-input v-model="transaction.buyer_name" placeholder="请输入买家名"></el-input>
          </el-form-item>
          <el-form-item label="买家身份证号">
            <el-input v-model="transaction.buyer_id" placeholder="请输入买家身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="交易数目">
            <el-input v-model="transaction.number" placeholder="请输入交易数目"></el-input>
          </el-form-item>
          <el-form-item label="产品单价">
            <el-input v-model="transaction.price" placeholder="请输入产品单价"></el-input>
          </el-form-item>
          <el-form-item label="交易地点">
            <el-input v-model="transaction.trade_place" placeholder="请输入交易地点"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTransaction = false">取 消</el-button>
          <el-button type="primary" @click="doTransaction()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="二维码" :visible.sync="dialogVisibleQrcode" width="30%">
        <img :src="this.qrCodeUrl" />

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisibleQrcode = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="交易历史" :visible.sync="dialogVisibleHistory" width="50%">
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

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisibleHistory = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'allUser',
  data() {
    return {
      dialogVisibleDetail: false,
      dialogVisibleHistory: false,
      dialogVisibleTransaction: false,
      dialogVisibleQrcode: false,
      qrCodeUrl: '',
      products: [],
      history: [],
      transaction: {
        food_id: '',
        trade_place: '',
        buyer_name: '',
        buyer_id: '',
        number: '',
        price: ''
      }
    }
  },

  methods: {
    showTransactionHistory(foodID) {
      this.dialogVisibleHistory = true
      console.log('foodID: ', foodID)
      axios
        .get(
          'http://localhost:9877/ikhnaie/v1/transaction/history?food_id=' +
            foodID
        )
        .then(response => {
          console.log(response.data)

          if (response.data.status_code === 200) {
            this.history = response.data.transaction_history
          } else {
            this.$message.error(response.data.status_msg)
          }
        })
    },

    beforeTransaction(foodID) {
      this.dialogVisibleTransaction = true
      this.transaction.food_id = foodID
    },
    doTransaction() {
      console.log('Transaction: ', this.transaction)

      axios
        .post(
          'http://localhost:9877/ikhnaie/v1/transaction/add',
          qs.stringify({
            food_id: this.transaction.food_id,
            seller_name: this.$cookies.get('user').username,
            seller_id: this.$cookies.get('user').user_id,
            buyer_name: this.transaction.buyer_name,
            buyer_id: this.transaction.buyer_id,
            number: this.transaction.number,
            price: this.transaction.price,
            trade_place: this.transaction.trade_place
          })
        )
        .then(response => {
          console.log(response.data)

          if (response.data.status_code === 200) {
            this.$message.success('交易成功')
            this.dialogVisibleTransaction = false
          } else {
            this.$message.error(response.data.status_msg)
          }
        })
        .catch(() => {
          this.$message.error('请求失败')
        })
    },

    generateQRCode(foodID) {
      this.dialogVisibleQrcode = true
      console.log('foodID: ', foodID)

      axios
        .get(
          'http://localhost:9877/ikhnaie/v1/qrcode/generate?food_id=' + foodID
        )
        .then(response => {
          console.log(response.data)

          if (response.data.status_code === 200) {
            this.qrCodeUrl = response.data.qrcode_url
          } else {
            this.$message.error(response.data.status_msg)
          }
        })
        .catch(() => {
          this.$message.error('请求失败')
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
