import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './page/Home.vue';
import Admin from './page/Admin.vue';
import Post from './page/post.vue';
import AdminCat from './page/AdminCat.vue'
import AdminPost from './page/AdminPost.vue';
Vue.use(VueRouter)
Vue.config.productionTip = false
const routeConfig = [{
    path: '/',
    component: Home,
  },
  {
    path: '/post/:id',
    component: Post
  },
  {
    path: '/admin',
    component: Admin,
    children: [{
      path: 'post',
      component: AdminPost,
    },{
      path:'cat',
      component: AdminCat,
    }]
  },
]
new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: routeConfig
  })
}).$mount('#app')