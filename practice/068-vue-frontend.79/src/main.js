import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import session from './lib/session'

import Home from './page/Home.vue'
import Login from './page/Login.vue'
import Signup from './page/Signup.vue'
import Setting from './page/Setting.vue'
import SettingMe from './page/SettingMe'
import SettingSecurity from './page/SettingSecurity'
import Thread from './page/Thread.vue'
import About from './page/About.vue'

import AdminBase from './page/admin/Base.vue'
import AdminUser from './page/admin/User.vue'
import AdminThread from './page/admin/Thread.vue'
import AdminCat from './page/admin/Cat.vue'
Vue.use(Router)

Vue.config.productionTip = false
const router = new Router({
  routes: [{
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/thread/:id',
      component: Thread,
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
    }, {
      path: '/admin',
      component: AdminBase,
      children: [{
          path: 'user',
          component: AdminUser
        },
        {
          path: 'thread',
          component: AdminThread,
        },
        {
          path: 'cat',
          component: AdminCat,
        },
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let toAdmin = to.matched[0].path == '/admin';
  if (toAdmin) {
    if (session.isAdmin())
      next();
    next(false);
  } else
    next();
});
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')