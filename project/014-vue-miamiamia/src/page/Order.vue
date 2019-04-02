<template>
  <div>
    <h1>我的订单</h1>
    <el-card v-if="$route.params.id" class="detail">
      <div slot="header">
        <span>订单详情</span>
        <router-link style="float: right;" to="/my/order">取消</router-link>
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
          <div>支付方式</div>
          <div>{{lang.payment[form.pay_by] || '-'}}</div>
        </div>
        <div class="pair">
          <div>订单状态</div>
          <div>{{form._paid? '已支付':'未支付'}}</div>
        </div>
        <div v-if="!form._paid">
          <div class="title">支付方式</div>
          <el-button @click="generatePaymentUrl('wechat')">微信</el-button>
          <el-button @click="generatePaymentUrl('alipay')">支付宝</el-button>
          <div v-if="form.$payment">
          <div v-if="this.form._pay_by=='wechat'">
               <img class="qrcode" :src="form.$payment.qrcode" alt="">
               <el-button type="primary" @click="read(); find()">支付完毕</el-button>
          </div>
          <div v-else>
            <a :href="form.$payment.url">点击跳转支付宝扫码支付</a>
          </div>
          </div>
        </div>
        <div class="well" style="margin:1em 0">
            测试用,所以价格写死了,都是0.01元
            </br>
            </br>
            订单详情页的商品快照暂时未完成
        </div>
      </div>
    </el-card>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="订单号" width="180"></el-table-column>
      <el-table-column prop="sum" label="总价" width="180"></el-table-column>
      <el-table-column label="订单状态" width="180">
        <template slot-scope="scope">{{scope.row._paid? '已支付':'未支付'}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small"><router-link :to="`/my/order/${scope.row.id}`">详情</router-link></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import {url} from '../lib/helper.js'
export default {
  data() {
    return {
      list: [],
      form: {},
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
    console.log(this.$route.params.id)
    if(this.$route.params.id){

      this.find();
    }
  },
  methods: {
    read() {
      let param = {
        where: {
          and: {
            user_id: session.user().id
          }
        }
      };
      api("order/read", param).then(r => {
        this.list = r.data;
      });
    },
    find() {
      this.form.id = this.$route.params.id;
      api("order/find", { id: this.form.id }).then(r => {
        this.form = r.data;
      });
    },
    generatePaymentUrl(type){
      this.form._pay_by=type;
       api('order/payment/url', {
          id         : this.form.id,
          pay_by     : type,
          fee        : .01,
          return_url : url('#/my/order'),
        })
          .then(r => {
            this.$set(this.form, '$payment', r.data);
          });
    }
  },
  watch: {
    '$route':{
      handler(n,o){
      let params=n.params;
      if(params.id){
        this.form.id=params.id;
        this.find();
      }
      }
    },
    deep:true,
  },
};
</script>
<style scoped>
 .card-content {
    padding: 1em;
  }

  .detail .title {
    margin: .5em 0;
  }
  .detail .pair{
    margin: .5em 0;
  }
  
  .qrcode {
    max-width: 200px;
  }
</style>
