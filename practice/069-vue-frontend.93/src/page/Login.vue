<template>
  <div class="form-container">
    <h1>登录</h1>
    <form @submit.prevent="login">
      <label>
        <span class="title">手机号/邮箱</span>
        <el-input v-model="form.uniqueName"></el-input>
      </label>
      <label>
        <span class="title">密码</span>
        <el-input v-model="form.password"></el-input>
      </label>
      <div class="errors" v-for="e in errors">{{e}}</div>
      <div class="well">
          <p>
            <strong>管理员账号</strong>
          </p>
          <div class="pair">
            <div>账号</div>
            <div>admin</div>
          </div>
          <div class="pair">
            <div>密码</div>
            <div>123456</div>
          </div>

          <p>
            <strong>常规账号</strong>
          </p>
          <router-link to="/signup" style="color:#409EFF">去注册</router-link>
        </div>
      <button type="submit" class="el-button el-button--primary" style="width:100%">登录</button>
      <el-button type="text">
        <router-link to="/recover">忘记密码？</router-link>
      </el-button>
    </form>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session";
export default {
  data() {
    return {
      form: {},
      errors: []
    };
  },
  methods: {
    login() {
      let f = this.form;
      if (!this.validate()) return;
      if (f.uniqueName == "admin" && f.password == "123456") {
        session.login("admin", { nickname: "管理员", IS_ADMIN: true }, "/#/admin/user");
        return;
      }
      let param = {
        where: {
          or: [["mail", "=", f.uniqueName], ["phone", "=", f.uniqueName]]
        }
      };
      api("user/first", param).then(r => {
        let user = r.data;
        if (!user || f.password != user.password) {
          this.errors.push("邮箱/手机号或密码输入有误");
        } else {
          delete user.password;
          session.login(user.id, user, "/");
        }
      });
    },
    validate() {
      this.errors = [];
      let f = this.form;
      let valid = true;
      if (!f.uniqueName || !f.password) {
        this.errors.push("请填写手机/邮箱和密码");
        valid = false;
      }
      return valid;
    }
  }
};
</script>

<style>
</style>
