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
             <div class="pair">
            <div>账号</div>
            <div>13959743423</div>
          </div>
          <div class="pair">
            <div>密码</div>
            <div>a123456</div>
            <div>或者你也可以试试自己注册个号码</div>
          </div>
          </p>
          <router-link to="/signup" style="color:rgba(233, 38, 3, 0.8);">去注册</router-link>
        </div>
      <div class="errors" v-for="e in errors">{{e}}</div>
      <el-button type="primary" style="width:100%" @click="login">登录</el-button>
      <el-button type="text">
        <router-link to="/recover" style="color:rgba(233, 38, 3, 0.8);">忘记密码？</router-link>
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
      if(f.uniqueName=='admin'&& f.password=='123456'){
        session.login('admin', {nickname:'管理员',IS_ADMIN:true}, '/#/admin/user')
      }
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
