<template>
  <div class="nav">
    <div class="row container">
      <div class="col-8">
        <div class="logo">
          <router-link to="/">
            <img :src="logo" alt>
          </router-link>
        </div>
      </div>
      <div class="col-16 text-right">
        <div class="search">
          <input type="search" placeholder="此功能暂未实现">
        </div>
        <div v-if="session.loggedIn()">
          <router-link to="/setting/me" class="nav-item" id="navItemName">{{session.user().name || session.user().username}}</router-link>
          <a href="#" @click="session.logout()">登出</a>
        </div>
        <div v-else>
          <router-link class="nav-item" to="/login">登录</router-link>
          <router-link class="nav-item" to="/signup">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../image/logo.png";
import session from '../lib/session.js';
export default {
  data() {
    return {
      logo,
      session
    };
  }
};
</script>
<style>
.nav {
  background: #fff;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.5rem;
}

.nav .logo {
  width: 30px;
}

.nav .text-right > * {
  display: inline-block;
}

.nav-item {
  display: inline-block;
  padding: 0.5rem;
}
</style>
