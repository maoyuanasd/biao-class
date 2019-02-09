<template>
  <div class="card">
    <div class="title">安全设置</div>
    <div class="content">
      <dl>
        <dt>密码</dt>
        <dd>
          <button @click="changePasswordVisible=!changePasswordVisible">
            <span v-if="changePasswordVisible">取消</span>修改密码
          </button>
        </dd>
      </dl>
      <form v-if="changePasswordVisible" @submit.prevent="validateAndChangePassword">
        <fieldset :disabled="changePasswordPending">
          <div class="input-control">
            <label>
              <span>旧密码</span>
              <input type="password" v-model="passwordForm.old">
              <span class="error" v-if="errorPassword.old">密码输入错误</span>
            </label>
          </div>
          <div class="input-control">
            <label>
              <span>新密码</span>
              <input type="password" v-model="passwordForm.new">
              <span class="error" v-if="errorPassword.new">密码长度应大于6位</span>
            </label>
          </div>
          <div class="input-control">
            <label>
              <span>重复密码</span>
              <input type="password" v-model="passwordForm.repeat">
              <span class="error" v-if="errorPassword.repeat">两次密码输入不一致</span>
            </label>
          </div>
          <div class="input-control">
            <button type="submit">确认修改</button>
          </div>
        </fieldset>
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
      passwordForm: {},
      changePasswordPending: false,
      changePasswordVisible: false,
      user: session.user(),
      errorPassword: {
        old: false,
        new: false,
        repeat: false
      }
    };
  },
  methods: {
    validateAndChangePassword() {
      this.validateRpeatPasword();
      if (this.validateNewPassword() || this.validateRpeatPasword()) {
        return;
      }
      this.validateOldPassword();
    },
    validateOldPassword() {
      this.changePasswordPending=true;
      let form = this.passwordForm;
      let id = this.user.id;
      api('user/find', { id ,only:['password']}).then(r => {
        if (r.success) {
          let invalidOld = (this.errorPassword.old =
            form.old !== r.data.password);
            if(invalidOld){
               this.changePasswordPending=false;
              return
            }
            api('user/update',{id,password:form.new}).then(r=>{
              if(!r.success){
                alert('密码修改失败');
               this.changePasswordPending=false;
               return
              }
              this.passwordForm={};
               this.changePasswordPending=false;
              this. changePasswordVisible=false;
             alert('密码修改成功');
            })
         
        }
      });
    },
    validateNewPassword() {
      return (this.errorPassword.new =
        !this.passwordForm.new || this.passwordForm.new.length < 6);
    },
    validateRpeatPasword() {
      return (this.errorPassword.repeat =
        !this.passwordForm.repeat ||
        this.passwordForm.repeat !== this.passwordForm.new);
    }
  }
};
</script>

