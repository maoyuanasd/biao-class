<template>
    <div class="nav">
        <div class="container ">
            <el-row>
                <el-col :span="12" class="text-left">
                    <router-link to="/"  class="anchor">首页</router-link>
                    <!-- <a href="#" class="anchor">item</a> -->
                </el-col>
                <el-col :span="12" class="text-right" position: relative>
                   <span @click="ui.showCart=!ui.showCart" class="anchor cart-item">
                    <span>购物车({{count}})</span>
                   </span>
                <cart @close="ui.showCart=false" v-show="ui.showCart" class="cart"/>
                   
                    <span v-if="session.loggedIn()">
                    <router-link :to="session.isAdmin()? '/admin/product':'/my/setting'" class="anchor">{{session.user().nickname || session.user().phone || session.user().mail }}</router-link>
                    <span @click="session.logout()" class="anchor">登出</span>
                    </span>
                    <span v-else>
                    <router-link to="/login"  class="anchor">登录</router-link>
                    <router-link to="/signup" class="anchor">注册</router-link>
                    </span>
                        
                </el-col>
            </el-row>
        </div>
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
        ui:{
          showCart:false,
        },
        count:0
    }
},
mounted() {
        this.count=cartService.productCount();

    cartService.onChange(()=>{
        this.count=cartService.productCount();
    })
},
methods: {
},
}
</script>

<style scoped>
.nav{
    background: rgba(233, 38, 3, 0.8);
}
.anchor{
    color:#fff;
}


</style>
