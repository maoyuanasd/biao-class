import './css/global.css';

import Vue    from 'vue';
import App    from './App.vue';
import Router from 'vue-router';

import Home            from './page/Home';
import About           from './page/About';
import Login           from './page/Login';
import Signup          from './page/Signup';
import Setting         from './page/Setting';
import SettingMe       from './page/SettingMe';
import SettingSecurity from './page/SettingSecurity';

Vue.config.productionTip = false;

Vue.use(Router);

new Vue({
  render : h => h(App),
  router : new Router({
    routes : [
      {
        path      : '/',
        component : Home,
      },
      {
        path      : '/about',
        component : About,
      },
      {
        path      : '/signup',
        component : Signup,
      },
      {
        path      : '/login',
        component : Login,
      },
      {
        path      : '/setting',
        component : Setting,
        children  : [
          {
            path      : 'me',
            component : SettingMe,
          },
          {
            path      : 'security',
            component : SettingSecurity,
          },
        ],
      },
    ],
  }),
}).$mount('#app');
