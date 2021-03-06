import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './page/Home.vue'
import Admin from './page/Admin.vue'
import Post from './page/Post.vue'
import AdminPost from './page/AdminPost.vue'
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
    path: 'post/',
    component: AdminPost
  }]
}
];

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: routeConfig
  })
}).$mount('#app')