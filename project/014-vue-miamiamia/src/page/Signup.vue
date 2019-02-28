<template>
  <div class="form-container">
    <h1>注册</h1>
    <el-form label-position="top" label-width="80px" :model="form">
      <el-tabs v-model="signupBy">
        <el-tab-pane label="手机注册" name="phone">
          <el-form-item label="手机号">
            <el-input @blur="uniqueExist" v-model="form.phone"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册" name="mail">
          <el-form-item label="邮箱">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item label="验证码">
        <!-- <el-input placeholder="请输入验证码" v-model="form.code">
          <el-button slot="append" v-if="sendCodeCountDown">{{sendCodeCountDown}}</el-button>
          <el-button slot="append" v-else @click="sendCode" :disabled="!form[signupBy]">发送验证码</el-button>
        </el-input> -->
        <fieldset :disabled="unique">
        <el-row>
          <el-col :span="18">
            <el-input placeholder="请输入验证码" v-model="form.code">
            </el-input>
          </el-col>
          <el-col :span="6">
            <Captcha
              @send="setCode"
              className="el-button el-button--default"
              :sendBy="signupBy"
              :receiver="form[signupBy]" 
            />
          </el-col>
        </el-row>
        </fieldset>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <div class="error" v-for="e in errors">{{e}}</div>
      <el-button type="primary" style="width:100%" @click="signup">加入吃货团</el-button>
    </el-form>
  </div>
</template>

<script>
import Captcha from '../component/Captcha'
import api from "../lib/api.js";
import { is } from "../lib/valee.js";
export default {
  components:{Captcha},
  data() {
    return {
      signupBy: "phone",
      form: {
        phone: "",
        mail: "",
        password: "",
        code: ""
      },
      sendCodeCountDown: 0,
      codeTimer: null,
      code: null,
      errors: [],
      unique:false
    };
  },
  methods: {
    signup() {
     if(!this.validate()) {
           return
     }
     api('user/create',this.form).then(r=>{
       this.$router.push('/');
       alert('注册成功')
     })
    },
    validate() {
      let f = this.form;
      let e = (this.errors = []);
      let s = this.signupBy;
      if (!f.phone && !f.mail) {
        e.push("邮箱和手机不能为空");
      }
      if (!is[s](this.form[s])) {
        e.push(`${s}的格式不正确`);
      }
      if (this.code != f.code) {
        e.push("验证码不正确");
      }
      if (f.password.length < 6) {
        e.push("密码的长度不可小于6位");
      }
      if (e.length)
      return false;
      return true;
    },
    setCode(it){
      this.code=it;
    },
    uniqueExist(){
      this.errors=[];
      let key=this.signupBy;
      let value=this.form[key];
      if(!value)
      return
      let param={
        where:{
          and:{
            [key]:value
          }
        }
      }
      api('user/first',param).then(r=>{
        if(r.data){
          this.errors.push('账户已存在');
          this.unique=true;
        }else{
          this.unique=false;
        }
      })
    } 
    // sendCode() {
    //   this.sendCodeCountDown = 60;
    //   this.codeTimer = setInterval(() => {
    //     this.sendCodeCountDown--;
    //     if (this.sendCodeCountDown == 0) {
    //       clearInterval(this.codeTimer);
    //     }
    //   }, 1000);
    //   let action;
    //   if(this.signupBy=='phone'){
    //     action='sms'
    //   }else{
    //     action='mail'
    //   }
    //   api(`captcha/${action}`, {
    //     phone: this.form.phone,
    //     mail: this.form.mail
    //   }).then(r => {
    //     this.code = atob(r.data.result);
    //   });
    // }
  }
};
</script>

<style>
</style>
