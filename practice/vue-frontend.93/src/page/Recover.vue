<template>
  <div class="form-container">
    <h1>重置密码</h1>
    <form @submit.prevent="nextStep">
      <el-tabs v-model="recoverBy">
        <el-tab-pane label="手机重置" name="phone">
          <label v-if="step==1">
            <span class="title">手机号</span>
            <el-input v-model="form.phone"></el-input>
          </label>
        </el-tab-pane>
        <el-tab-pane label="邮箱重置" name="mail">
          <label v-if="step==1">
            <span class="title">邮箱</span>
            <el-input v-model="form.mail"></el-input>
          </label>
        </el-tab-pane>
      </el-tabs>
      <label v-if="step==2">
        <span class="title">验证码</span>
        <el-row>
          <el-col :span="18">
            <el-input placeholder="请输入验证码" v-model="form.code">
              <!-- <el-button v-if="sendCodeCountDown" disabled slot="append">{{sendCodeCountDown}}</el-button>
              <el-button v-else slot="append" @click="sendCode" :disabled="!form[recoverBy]">发送验证码</el-button>-->
            </el-input>
          </el-col>
          <el-col :span="6">
            <Captcha
              @send="setCode"
              class="el-button el-button--default"
              :sendBy="recoverBy"
              :receiver="form[recoverBy]"
            />
          </el-col>
        </el-row>
      </label>
      <label v-if="step==3">
        <span class="title">密码</span>
        <el-input v-model="form.password"></el-input>
      </label>
      <div class="error" v-for="e in errors">{{e}}</div>
      <label>
        <button
          v-if="step==3"
          type="submit"
          class="el-button el-button--primary"
          @click="nextStep()"
        >确定重置</button>
        <button type="submit" @click="nextStep()" class="el-button el-button--primary" v-else>下一步</button>
      </label>
    </form>
  </div>
</template>

<script>
import api from "../lib/api.js";
import { is } from "../lib/valee.js";
import Captcha from "../component/Captcha";
export default {
  components: { Captcha },
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
      user: null
    };
  },
  methods: {
    nextStep() {
      let f = this.form;
      let by = this.recoverBy;
      let e = (this.errors = []);
      switch (this.step) {
        case 1:
          if (!f.phone && !f.mail) {
            e.push("必须填手机或者邮箱");
            return;
          }
          api("user/first", { where: { and: { [by]: f[by] } } }).then(r => {
            let user = r.data;
            if (!user) {
              e.push("账户不存在");
            } else {
              this.user = user;
              this.step = 2;
            }
          });
          break;
        case 2:
          if (this.code !== f.code) {
            e.push("验证码不正确");
          } else {
            this.step = 3;
          }
          break;
        case 3:
          if (f.password.length < 6) {
            e.push("密码长度太短,应多于6位");
            return;
          }
          let param = {
            id: this.user.id,
            password: f.password
          };
          api("user/update", param).then(r => {
            alert("密码修改成功");
            this.$router.push("/login");
          });
          break;
      }
    },
    setCode(it) {
      this.code = it;
      console.log(this.code);
    }
    // sendCode() {
    //   if (this.recoverBy == "phone") {
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
  }
};
</script>

<style>
</style>
