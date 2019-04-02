import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import Router from 'vue-router';
import './css/global.css';
import session from './lib/session'
import VueLazyLoad from 'vue-lazyload'

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
import AdminOrder from './page/admin/Order';
Vue.config.productionTip = false

Vue.filter('cut', function (value,max) {
  if (!value) return ''
  value = value.toString()
  return value.slice(0, max) + '...';
})
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueLazyLoad,{
  error:'./img/lazyImg.jpg',
  loading:'./img/lazyImg.jpg'
})

const router = new Router({
  // mode: 'hash',
  // base: __dirname,

  routes: [{
      path: '/',
      component: Home,
      meta: { title: "欢迎来到miamiamia吃货团" },
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
          component: Cart,
      meta: { title: "管理" },

        },
        {
          path: 'order/:id?',
          component: Order,
      meta: { title: "订单管理" },

        },
        {
          path: 'setting',
          component: Setting,
      meta: { title: "个人设置" },

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
          meta: { title: "用户管理" },
      },
        {
        path: 'brand',
        component: AdminBrand,
      meta: { title: "品牌管理" },

      },
        {
        path: 'cat',
        component: AdminCat,
      meta: { title: "分类管理" },

      },
        {
        path: 'product',
        component: AdminProduct,
      meta: { title: "产品管理" },

      },
      {
        path:'order',
        component:AdminOrder,
      meta: { title: "订单管理" },

      }
    ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
let isAdmin=to.matched[0].path=='/admin';
if(isAdmin && !session.isAdmin()){
  return;
}
if (to.meta.title) {
  document.title = to.meta.title
}
next()
})
  

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')