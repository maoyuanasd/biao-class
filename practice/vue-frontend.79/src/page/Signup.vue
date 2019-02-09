<template>
  <div>
    <div class="form-container">
      <h1>注册</h1>
      <form @submit.prevent="sigup" @keyup="validateCurrent">
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
          <button type="submit">免费注册</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
export default {
  data() {
    return {
      current: {
        username: null,
        password: null,
        password2: null
      },
      error: {
        username: null,
        password: null,
        password2: null
      },
    };
  },
  methods: {
    sigup() {
      
      if (!this.validateCurrent()) {
        return;
      }
      this.existsUser(this.current.username,r=>{
        if(r){
          alert('用户名重复');
          return;
        }
      if (this.validateCurrent()) {
        api("user/create", this.current).then(r => {
          alert("注册成功");
          this.$router.push("/login");
        });
      }
      })
    },
    existsUser(uname,callback) {
   api('user/exists', {
        where: {
          and: {
            username: uname
          }
        }
      }).then(r => {
       callback && callback(r.data);
      });
    },
    validateCurrent() {
      let e = this.error;
      let username = this.current.username;
      let password = this.current.password;
      let password2 = this.current.password2;
      let validateUsername = !username || !/[a-zA-Z0-9]{4,12}/.test(username);
      let validatePassword = !password || password.length < 6;
      let validatePassword2 = !password2 || password2 !== password;
      validateUsername
        ? (e.username = "用户名有误,应在4到12位之间")
        : (e.username = null);
      validatePassword
        ? (e.password = "密码长度太短,应多于6位")
        : (e.password = null);
      validatePassword2
        ? (e.password2 = "重复密码不一样")
        : (e.password2 = null);
      return !e.username && !e.password && !e.password2;
    },
    
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>

