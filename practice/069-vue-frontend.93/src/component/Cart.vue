<template>
  <div class="cart">
    <el-card>
      <div slot="header" class="clearfix">
        <span>我的购物车</span>
        <span @click="$emit('close')" class="anchor" style="float: right;">关闭</span>
      </div>
      <div v-if="listCartArr.length<1">
        暂无内容
      </div>
      <div v-else>
      <el-row class="item" v-for="(it,key) in listCart">
        <el-col :span="4">
          <ProductThumb :data="it.product_snapshot"/>
        </el-col>
        <el-col :span="10">{{it.product_snapshot.title}}</el-col>
        <el-col :span="2" class="cny hot text-center">{{it.product_snapshot.price}}</el-col>
        <el-col :span="8" class="text-right">
          <div data-v-360b7628 class="el-input-number el-input-number--mini">
            <span
              @click="cartService.change(key,null,null,null,'--')"
              role="button"
              class="el-input-number__decrease"
            >
              <i class="el-icon-minus"></i>
            </span>
            <span
              @click="cartService.change(key,null,null,null,'++')"
              role="button"
              class="el-input-number__increase"
            >
              <i class="el-icon-plus"></i>
            </span>
            <div class="el-input el-input--mini">
              <input
                v-model="it.count"
                type="text"
                autocomplete="off"
                aria-label="描述文字"
                min="1"
                class="el-input__inner"
                role="spinbutton"
                aria-valuemax="10"
                aria-valuemin="1"
                aria-valuenow="1"
                aria-disabled="undefined"
              >
            </div>
          </div>
          <p>
            <el-button @click="cartService.remove(key)" type="danger" plain size="mini">删除</el-button>
          </p>
        </el-col>
      </el-row>
      <p>
        <span class="hot cny">总价:{{orderSum}}</span>
      </p>
      <p>
        <el-button @click="createOrder" type="primary">付款</el-button>
      </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import cartService from '../service/cart.js'
import ProductThumb from '../component/ProductThumb'
import { createOrder, orderSum } from '../lib/order.js'
import { obj2Arr } from '../lib/helper.js'
import session from '../lib/session.js'
export default {
  components: { ProductThumb },
  data() {
    return {
      listCart: {},
      cartService
    }
  },
  mounted() {
    this.listCart = cartService.get();
    cartService.onChange(data => {
      this.listCart = data;
    });
  },
  computed: {
    listCartArr() {
      return obj2Arr(this.listCart)
    },
    orderSum() {
      return orderSum(this.listCartArr)
    },
  },
  methods: {
    createOrder() {
     createOrder(this.listCartArr, session.user().id).then(r=>{
         this.$router.push(`/my/order/${r.data.id}`);
         cartService.clear();
         this.$emit('close');
      })

    },
  },
}
</script>

<style scoped>
h2 {
  text-align: center;
}

.cart {
  background: #fff;
  position: fixed;
  max-width: 600px;
  z-index: 10;
  right: 0;
  max-width: 500px;
  min-width: 200px;
  font-size: 90%;
  /*bottom: 0;*/
  /*top: 20px;*/
}
.el-input-number--mini {
  max-width: 100px;
}
.item {
  margin: 1em 0;
}
</style>
