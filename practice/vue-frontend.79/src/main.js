import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import Home from './page/Home.vue'
import Login from './page/Login.vue'
import Signup from './page/Signup.vue'
import Setting from './page/Setting.vue'
import SettingMe from './page/SettingMe'
import SettingSecurity from './page/SettingSecurity'
Vue.use(Router)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: new Router({
    routes: [{
        path: '/',
        component: Home,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/signup',
        component: Signup,
      }, {
        path: '/setting',
        component: Setting,
        children: [{
            path: 'me',
            component: SettingMe
          },
          {
            path: 'security',
            component: SettingSecurity,
          },
        ]
      }
    ]
  })
}).$mount('#app')