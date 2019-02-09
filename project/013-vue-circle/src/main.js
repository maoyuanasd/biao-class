import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import Home from './page/Home.vue'
import Signup from './page/Signup.vue'
import Login from './page/Login.vue'
import SettingMe from './page/SettingMe.vue'
import Setting from './page/Setting.vue'
import SettingSecurity from './page/SettingSecurity.vue'
Vue.use(Router)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:new Router({
    routes:[
      {
        path:'/',
        component:Home
      },
      {
        path:'/signup',
        component:Signup
      },
      {
        path:'/login',
        component:Login
      },
      {
        path:'/setting',
        component:Setting,
        children:[
          {
            path:'me',
            component:SettingMe
          },
          {
            path:'security',
            component:SettingSecurity
          },
        ]
      },
    ],
  })
}).$mount('#app')
