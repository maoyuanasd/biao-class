<template>
  <div>
    <h1>我的订单</h1>
    <el-card class="detail" v-if="$route.params.id">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
      </div>
      <div class="card-content">
        <div class="pair">
          <div>订单号</div>
          <div>{{form.id}}</div>
        </div>
        <div class="pair">
          <div>总价</div>
          <div class="cny">{{form.sum}}</div>
        </div>
        <div class="pair">
          <div>付款方式</div>
          <div>{{lang.payment[form._pay_by] || '-'}}</div>
        </div>
        <div class="pair">
          <div>订单状态</div>
          <div>{{form._paid? '已支付':'未支付'}}</div>
        </div>
        <div  v-if="!form._paid">
          <div class="title">请选择付款方式</div>
          <el-button @click="generatePaymentUrl('wechat')">微信支付</el-button>
          <el-button @click="generatePaymentUrl('alipay')">支付宝支付</el-button>
        <p>测试支付价格都.01元</p>
        </div>
        <div v-if="form.$payment">
          <div class="qrcode" v-if="form._pay_by=='wechat'">
            <img :src="form.$payment.qrcode" alt>
            <el-button type="primary" @click="read(); find()">支付完毕</el-button>
          </div>
          <div v-else>
            <a :href="form.$payment.url">跳转支付宝扫码付款</a>
          </div>
        </div>
      </div>
    </el-card>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="订单号" width="180"></el-table-column>
      <el-table-column prop="sum" label="总价" width="180"></el-table-column>
      <el-table-column label="订单状态" width="100">
        <template slot-scope="scope">{{scope.row._paid? '已支付':'未支付'}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <router-link :to="`/my/order/${scope.row.id}`">详情</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import { url } from "../lib/helper.js";
export default {
  data() {
    return {
      form: {},
      list: [],
      id: session.user().id,
      lang: {
        payment: {
          alipay: "支付宝",
          wechat: "微信支付"
        }
      }
    };
  },
  mounted() {
    this.read();
    if (this.$route.params.id) this.find();
  },
  methods: {
    read() {
      let param = {
        where: {
          and: {
            user_id: this.id
          }
        }
      };
      api("order/read", param).then(r => {
        this.list = r.data;
      });
    },
    find() {
      api("order/find", { id: this.$route.params.id }).then(r => {
        this.form = r.data;
      });
    },
    generatePaymentUrl(type) {
      this.form._pay_by = type;
      api("order/payment/url", {
        id: this.form.id,
        pay_by: type,
        fee: 0.01,
        return_url: url("#/my/order")
      }).then(r => {
        console.log(r);
        this.$set(this.form, "$payment", r.data);
      });
    }
  },
  watch: {
    $route: {
      handler(n, o) {
        let params = n.params;
        if (params.id) {
          this.form.id = params.id;
          this.find();
        }
      }
    },
    deep: true
  }
};
</script>
<style scoped>
/* .card-content {
    padding: 1em;
  } */

.detail .title {
  margin: 0.5em 0;
}
.detail .pair {
  margin: 0.5em 0;
}
.qrcode {
  max-width: 200px;
}
</style>

