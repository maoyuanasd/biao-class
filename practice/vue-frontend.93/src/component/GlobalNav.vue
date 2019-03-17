<template>
  <div class="nav">
    <div class="container">
      <el-row>
        <el-col :span="12" class="text-left">
          <router-link class="anchor" to="/">首页</router-link>
          <a href="#" class="anchor">item</a>
        </el-col>
        <el-col :span="12" class="text-right">
          <span @click="ui.showCart=!ui.showCart" class="anchor">购物车</span>({{cartCount}})
          <!-- <a href="#" class="anchor">item</a> -->
          <span v-if="session.loggedIn()">
            <router-link
              class="anchor"
              :to="session.isAdmin()? '/admin/user' : '/my/setting'"
            >{{session.user().nickname ||session.user().phone || session.user().mail}}</router-link>
            <span class="anchor" @click="session.logout()">登出</span>
          </span>
          <span v-else>
            <router-link to="/signup" class="anchor">注册</router-link>
            <router-link to="/login" class="anchor">登录</router-link>
          </span>
        </el-col>
      </el-row>
    </div>
    <Cart @close="ui.showCart=false"  v-show="ui.showCart"/>
  </div>
</template>

<script>
import session from '../lib/session.js'
import Cart from './Cart'
import cartService from '../service/cart.js'
export default {
  components:{Cart},
  data() {
    return {
      session,
      cartCount:0,
      ui:{
        showCart:false,
      }
    }
  },
  mounted() {
     this.cartCount=cartService. productCount();
    cartService.onChange((data)=>{
     
      this.cartCount=cartService. productCount();
    })
  },
}
</script>

<style scoped>
.nav {
  background: rgba(0, 0, 0, 0.1);
}
</style>
