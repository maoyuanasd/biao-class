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
      <div class="card">
         <div class="title">测试用户账号</div>
        <div class="content">
          <dl>
            <dt>用户名</dt>
            <dd>admin</dd>
          </dl>
          <dl>
            <dt>密码</dt>
            <dd>123456</dd>
          </dl>
        </div>
      </div>
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
      },
      admin: {
        username: "admin",
        password: "123456",
        
      }
    };
  },
  methods: {
    isAdmin() {
      let current = this.current;
      let admin = this.admin;
      if (
        current.username !== admin.username ||
        current.password !== admin.password
      )
        return false;
      return true;
    },
    login() {
      let current = this.current;
      let username = current.username;
      let password = current.password;
      if (!username || !password) {
        this.error.invalidMatch = true;
        return;
      }
      if(this.isAdmin()){
        let user={...this.current};
        user.IS_ADMIN =true;
        user.id=0;
         session.login(user.id,user,'/#/admin/user');
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

        session.login(user.id, user, "/");
      });
    }
  }
};
</script>
<style scoped>
h1 {
    text-align: center;
  }

  dl {
    padding: .5rem !important;
  }
</style>
