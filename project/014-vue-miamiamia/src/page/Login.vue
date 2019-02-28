<template>
  <div class="form-container">
    <h1>登录</h1>
    <el-form label-position="top" label-width="80px" :model="form">
      <el-form-item label="手机号/邮箱">
        <el-input v-model="form.uniqueName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <div class="errors" v-for="e in errors">{{e}}</div>
      <el-button type="primary" style="width:100%" @click="login">登录</el-button>
      <el-button type="text">
        <router-link to="/recover">忘记密码？</router-link>
      </el-button>
    </el-form>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
export default {
  data() {
    return {
      form: {},
      errors: []
    };
  },
  methods: {
    login() {
      if(!this.validate())
      return;
      let f=this.form
      let param={
        where:{
          or:[
            ['mail','=',f.uniqueName],
            ['phone','=',f.uniqueName]
          ]
        }
      }
      api('user/first',param).then(r=>{
        let user=r.data;
        if(!user || f.password!=user.password){
          this.errors.push('手机/邮箱有误或密码有误')
        }else{
          delete user.password;
          session.login(user.id,user,'/');
        }
      })
    },
    validate() {
      let f = this.form;
      this.errors = [];
      let valid = true;
      if (!f.uniqueName || !f.password) {
        valid = false;
        this.errors.push("手机/邮箱不能为空");
      }
      return valid;
    }
  }
};
</script>

<style>
</style>
