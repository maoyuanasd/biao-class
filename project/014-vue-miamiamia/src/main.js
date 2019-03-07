import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import Router from 'vue-router';
import './css/global.css';
import session from './lib/session'

import Home from './page/Home.vue'
import Product from './page/Product.vue'
import Search from './page/Search.vue'
import Login from './page/Login.vue'
import Signup from './page/Signup.vue'
import Recover from './page/Recover'


import My from './page/My'
import Setting from './page/Setting';
import Order from './page/Order';
import Cart from './page/Cart';

import AdminBase from './page/admin/Base';
import AdminUser from './page/admin/User';
import AdminBrand from './page/admin/Brand';
import AdminCat from './page/admin/Cat';
import AdminProduct from './page/admin/Product';
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      component: Home,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/recover',
      component: Recover,
    },
    {
      path: '/product/:id',
      component: Product,
    },
    {
      path: '/my',
      component: My,
      children: [{
          path: 'cart',
          component: Cart
        },
        {
          path: 'order/:id?',
          component: Order
        },
        {
          path: 'setting',
          component: Setting
        },
      ]
    },
    {
      path: '/admin',
      component: AdminBase,
      children: [
        {
        path: 'user',
        component: AdminUser,
      },
        {
        path: 'brand',
        component: AdminBrand,
      },
        {
        path: 'cat',
        component: AdminCat,
      },
        {
        path: 'product',
        component: AdminProduct,
      },
    ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
let isAdmin=to.matched[0].path=='/admin';
if(isAdmin && !session.isAdmin()){
  return;
}
next()
})
  

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')