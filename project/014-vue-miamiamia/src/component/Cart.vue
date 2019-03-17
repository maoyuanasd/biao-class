<template>
  <div>
    <el-card class="text-left">
      <div slot="header" class="clearfix">
        <span>我的购物车</span>
        <el-button @click="$emit('close')" style="float: right; padding: 3px 0" type="text">关闭</el-button>
      </div>
      <el-row v-for="(value,key) in cartList" class="item">
        <el-col :span="4">
          <ProductThumb style="margin:0 .2em" :row="value.product_snapshot"/>
        </el-col>
        <el-col :span="11">{{value.product_snapshot.title}}</el-col>
        <el-col :span="3" class="cny hot">{{value.product_snapshot.price}}</el-col>
        <el-col :span="6">
          <div data-v-360b7628 class="el-input-number el-input-number--mini">
            <span
              @click="cartService.change(key,null,null,null,null,'--')"
              role="button"
              class="el-input-number__decrease"
            >
              <i class="el-icon-minus"></i>
            </span>
            <span
              @click="cartService.change(key,null,null,null,null,'++')"
              role="button"
              class="el-input-number__increase"
            >
              <i class="el-icon-plus"></i>
            </span>
            <div class="el-input el-input--mini">
              <input
                v-model="value.count"
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
          <p class="text-right">
            <el-button @click="cartService.remove(key)" type="danger" plain size="mini">删除</el-button>
          </p>
        </el-col>
      </el-row>
      <p>
        <span class="cny hot">{{cartSum}}</span>
      </p>
      <p>
        <el-button @click="createOrder" type="primary">支付</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import cartService from '../service/cart.js'
import ProductThumb from '../component/ProductThumb'
import { obj2Arr } from '../lib/helper.js'
import { orderSum, createOrder } from '../lib/order.js'
export default {
  components: { ProductThumb },
  data() {
    return {
      cartList: {},
      cartService,
    }
  },
  mounted() {
    this.cartList = cartService.get();
    cartService.onChange((data) => {
      this.cartList = data
    })
  },
  methods: {
    createOrder() {
      createOrder(this.cartArr).then(r => {
        this.$router.push(`/my/order/${r.data.id}`)
        this.$emit('close');
        cartService.clear();

      })
    }
  },
  computed: {
    cartArr() {
      return obj2Arr(this.cartList);
    },
    cartSum() {
      return orderSum(this.cartArr);
    }
  },
}
</script>

<style>
.cart {
  position: absolute;
  /* position: fixed; */
  max-width: 400px;
  min-width: 200px;
  z-index: 10;
  font-size: 85%;
  right: 0px;
  /*border: solid;*/
  /* right: 15px; */
}
.el-input-number--mini {
  max-width: 100px;
}
.item {
  margin: 0.5em 0;
}
</style>
