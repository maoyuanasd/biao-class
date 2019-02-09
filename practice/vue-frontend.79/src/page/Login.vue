<template>
  <div>
    <div class="form-container">
      <h1>登录</h1>
      <form @submit.prevent="login">
        <div class="input-control">
          <label>
            <div class="fild">用户名</div>
            <input type="text" v-model="current.username">
          </label>
        </div>
        <div class="input-control">
          <label>
            <div class="fild">密码</div>
            <input type="password" v-model="current.password">
          </label>
        </div>
        <div class="input-control">
          <div v-if="error.invalidMatch" class="error">用户名或密码有误</div>
          <button type="submit">提交</button>
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
      current: {
        username: null,
        password: null
      },
      error: {
        invalidMatch: false
      }
    };
  },
  methods: {
    login() {
      let current = this.current;
      let username = current.username;
      let password = current.password;
      if (!username || !password) {
        this.error.invalidMatch = true;
        return;
      }
      let param = {
        where: {
          and: {
            username,
            password
          },
        },
          only: ['id','username','name']
      };
      api("user/first", param).then(r => {
        let user = r.data;
             if(!user){
                   this.error.invalidMatch=true;
                  return;
             }

          session.login(user.id, user,'/')
      });
    }
  }
};
</script>