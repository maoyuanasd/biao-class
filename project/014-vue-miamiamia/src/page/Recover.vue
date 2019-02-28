<template>
  <div class="form-container">
    <h1>密码重置</h1>
    <el-form label-position="top" label-width="80px" :model="form">
      <el-tabs v-model="recoverBy">
        <el-tab-pane v-if="step==1" label="手机注册" name="phone">
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane v-if="step==1" label="邮箱注册" name="mail">
          <el-form-item label="邮箱">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item v-if="step==2" label="验证码">
        <el-input placeholder="请输入验证码" v-model="form.code">
          <el-button slot="append" v-if="sendCodeCountDown">{{sendCodeCountDown}}</el-button>
          <el-button slot="append" v-else @click="sendCode" :disabled="!form[recoverBy]">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item v-if="step==3" label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <div class="error" v-for="e in errors">{{e}}</div>
      <el-button type="primary" style="width:100%" @click="nextStep">{{buttonText}}</el-button>
    </el-form>
  </div>
</template>

<script>
import api from "../lib/api.js";
import { is } from "../lib/valee.js";
export default {
  data() {
    return {
      recoverBy: "phone",
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
      step: 1,
      buttonText: "下一步",
      user:null
    };
  },
  methods: {
    recover() {
      if (!this.validate()) {
        return;
      }
      api("user/create", this.form).then(r => {
        this.$router.push("/");
        alert("注册成功");
      });
    },
    validate() {
      let f = this.form;
      let e = (this.errors = []);
      let s = this.recoverBy;
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
      if (e.length) return false;
      return true;
    },
    nextStep() {
      let f = this.form;
      let e = this.errors=[];
      let by = this.recoverBy;
      switch (this.step) {
        case 1:
          if (by=='phone' && !f.phone) {
            e.push("手机不能为空");
            return;
          }
          if (by=='mail' && !f.mail) {
            e.push("邮箱不能为空");
            return;
          }
          api("user/first", { where: { and: { [by]: f[by] } } }).then(r => {
            let user = r.data;
            if (!user) {
              e.push("账户不存在");
            } else {
              this.step = 2;
              this.user=user;
            }
          });
          break;
        case 2:
        if(this.code!=f.code){
            e.push('验证码有误')
        }else{
            this.step=3
            this.buttonText='确定重置'
        }
          break;
        case 3:
        let param={
            id:this.user.id,
            password:f.password
        }
        api('user/update',param).then(r=>{
            alert('密码修改成功')
            this.$router.push('login');
        })
          break;
      }
    },
    sendCode() {
      this.sendCodeCountDown = 60;
      this.codeTimer = setInterval(() => {
        this.sendCodeCountDown--;
        if (this.sendCodeCountDown == 0) {
          clearInterval(this.codeTimer);
        }
      }, 1000);
      let action;
      if (this.recoverBy == "phone") {
        action = "sms";
      } else {
        action = "mail";
      }
      api(`captcha/${action}`, {
        phone: this.form.phone,
        mail: this.form.mail
      }).then(r => {
        this.code = atob(r.data.result);
      });
    }
  }
};
</script>

<style>
</style>
