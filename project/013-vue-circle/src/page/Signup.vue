<template>
  <div>
    <div class="form-container">
      <h1>注册</h1>
      <form @submit.prevent="signup" @click="validateCurrent">
        <div class="input-control">
          <label>
            <div class="fild">用户名</div>
            <input type="text" v-model="current.username">
            <span v-if="error.username" class="error">{{error.username}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <div class="fild">密码</div>
            <input type="password" v-model="current.password">
            <span v-if="error.password" class="error">{{error.password}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <div class="fild">重复密码</div>
            <input type="password" v-model="current.password2">
            <span v-if="error.password2" class="error">{{error.password2}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <button type="submit">提交</button>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from "../lib/api.js";
import session from '../lib/session.js'
export default {
  data() {
    return {
      current: {},
      error: {
        username: null,
        password: null,
        password2: null
      }
    };
  },
  methods: {
    signup() {
      if (!this.validateCurrent()) {
        return;
      }
      console.log(1);
      api("user/exists", {
        where: { and: { username: this.current.username } }
      }).then(r => {
        if (r.data) {
          alert("用户名重复");
          return;
        }
        api("user/create", this.current).then(r => {
          alert("注册成功");
         let user={};
         let e=r.data;
         user.username=e.username;
         user.name=e.name;
         user.id=e.id;
          session.login(user.id,user)
        });
      });
    },
    validateCurrent() {
      let c = this.current;
      let e = this.error;
      let username = c.username;
      let password = c.password;
      let password2 = c.password2;
      let validateUsername = !username || !/[a-zA-z0-9]{4,12}/.test(username);
      let validatePassword = !password || password.length < 6;
      let validatePassword2 = !password2 || password2 !== password;
      validateUsername
        ? (e.username = "用户名有误,应在4到12位之间")
        : (e.username = null);
      validatePassword
        ? (e.password = "密码长度应大于6位")
        : (e.password = null);
      validatePassword2
        ? (e.password2 = "两次密码不一样")
        : (e.password2 = null);
      return !e.username && !e.password && !e.password2;
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>

