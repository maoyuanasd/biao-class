<template>
  <div class="form-container">
    <h1>注册</h1>
    <form @submit.prevent="signup">
      <el-tabs v-model="signupBy">
        <el-tab-pane label="手机注册" name="phone">
          <label>
            <span class="title">手机号</span>
            <el-input v-model="form.phone" @blur="uniqueExist"></el-input>
          </label>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册" name="mail">
          <label>
            <span class="title">邮箱</span>
            <el-input v-model="form.mail"></el-input>
          </label>
        </el-tab-pane>
      </el-tabs>
      <label>
        <span class="title">验证码</span>
        <!-- <el-input placeholder="请输入验证码" v-model="form.code">
          <el-button v-if="sendCodeCountDown" disabled slot="append">{{sendCodeCountDown}}</el-button>
          <el-button v-else slot="append" @click="sendCode" :disabled="!form[signupBy]">发送验证码</el-button>
        </el-input> -->
        <fieldset :disabled="!unique">
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
      </label>
      <label>
        <span class="title">密码</span>
        <el-input v-model="form.password"></el-input>
      </label>
      <div class="error" v-for="e in errors">{{e}}</div>
      <label>
        <button class="el-button el-button--primary" type="submit">加入吃货团</button>
      </label>
    </form>
  </div>
</template>

<script>
import api from "../lib/api.js";
import { is } from "../lib/valee.js";
import Captcha from '../component/Captcha';
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
      unique:true
    };
  },
  methods: {
    signup() {
      if (!this.validate()) return;
      api("user/create", this.form).then(r => {
        alert("注册成功");
        this.$router.push("/login");
      });
    },
    validate() {
      let f = this.form;
      let e = (this.errors = []);
      if (!f.phone && !f.mail) {
        e.push("必须填手机或者邮箱");
      }
      if (!is[this.signupBy](f[this.signupBy])) {
        e.push(`${this.signupBy}的格式不正确`);
      }
      if (f.password.length < 6) {
        e.push("密码长度太短,应多于6位");
      }
      if (f.code !== this.code) {
        e.push("验证码不正确");
      }
      if (e.length) {
        return false;
      }
      return true;
    },
    uniqueExist(){
     let key=this.signupBy;
     let value=this.form[key];
     this.errors=[];
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
         this.unique=false;
       }else{
         this.unique=true;
       }
     })
    },
    
    // sendCode() {
    //   if (this.signupBy == "phone") {
    //     action = "sms";
    //   } else {
    //     action = "mail";
    //   }
    //   this.sendCodeCountDown = 60;
    //   this.codeTimer = setInterval(() => {
    //     this.sendCodeCountDown--;
    //     if (this.sendCodeCountDown == 0) clearInterval(this.codeTimer);
    //   }, 1000);
    //   let action;
    //   api(`captcha/${action}`, {
    //     phone: this.form.phone,
    //     mail: this.form.mail
    //   }).then(r => {
    //     this.code = atob(r.data.result);
    //   });
    // }
    setCode(it){
      this.code=it;
    }
  }
};
</script>

<style scoped>


</style>
