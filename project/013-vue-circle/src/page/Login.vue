<template>
  <div>
    <div class="form-container">
      <h1>登录</h1>
      <form @submit.prevent="login">
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
          <div v-if="error.invalidMatch" class="error">用户名或密码有误</div>
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
import session from "../lib/session.js";
export default {
  data() {
    return {
      current: {},
      error: {
        invalidMatch: false
      }
    };
  },
  methods: {
    login() {
      let c = this.current;
      let username = c.username;
      let password = c.password;
      if (!username || !password) {
        alert("用户名或者密码不能为空");
        return;
      }
      let param = {
        where: {
          and: {
            username,
            password
          }
        },
        only: ["id", "username", "name"]
      };
      api("user/first", param).then(r => {
        let user = r.data;
        if (!user) {
          this.error.invalidMatch = true;
          return;
        }
        session.login(user.id, user);
      });
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>