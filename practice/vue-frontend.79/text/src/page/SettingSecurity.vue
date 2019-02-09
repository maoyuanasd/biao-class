<template>
  <div class="card">
    <div class="title">安全设置</div>
    <div class="content">
      <dl>
        <dt>密码</dt>
        <dd>
          <button @click="changePasswordVisible = !changePasswordVisible">
            <span v-if="changePasswordVisible">取消</span>修改密码
          </button>
        </dd>
      </dl>
      <form @submit.prevent="validateAndChangePassword" v-if="changePasswordVisible">
        <fieldset :disabled="changePasswordPending">
          <div class="input-control">
            <label>
              <span class="title">旧密码</span>
              <input type="password" class="field" v-model="passwordForm.old">
              <span v-if="errorPassword.old" class="error">旧密码有误</span>
            </label>
            <label>
              <span class="title">新密码</span>
              <input type="password" class="field" v-model="passwordForm.new">
              <span v-if="errorPassword.new" class="error">密码长度需大于6位</span>
            </label>
            <label>
              <span class="title">重复新密码</span>
              <input type="password" class="field" v-model="passwordForm.repeat">
              <span v-if="errorPassword.repeat" class="error">两次输入不一致</span>
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
  import store from '../lib/store';
  import api   from '../lib/api';

  export default {
    data () {
      return {
        passwordForm          : {}, // 修改密码表单内的数据
        changePasswordVisible : false, // 修改密码表单是否可见
        changePasswordPending : false, // 禁用表单防止重复提交
        user                  : store.get('user'), // 当前用户的信息
        errorPassword         : { // 修改密码表单的错误
          old    : false,
          new    : false,
          repeat : false,
        },
      };
    },
    methods : {
      validateAndChangePassword () {
        if (this.invalidNewPassword() || this.invalidRepeatPassword())
          return;

        // 禁用表单防止重复提交
        this.changePasswordPending = true;

        let form = this.passwordForm;
        let user = this.user;

        // 验证旧密码
        api('user/find', { id : user.id, only : [ 'password' ] })
          .then(r => {
            let invalidOld = form.old !== r.data.password;

            if (invalidOld) {
              this.errorPassword.old = true;
              this.changePasswordPending = false;
              return;
            }

            this.errorPassword.old = false;
            this.changePassword();
          });
      },

      changePassword () {
        let user      = this.user;
        user.password = this.passwordForm.new;

        api('user/update', user)
          .then(r => {
            if (!r.success) {
              alert('密码更新失败！');
              return;
            }

            this.passwordForm          = {};
            this.changePasswordVisible = false;
            this.changePasswordPending = false;
            alert('密码更新成功！');
          });
      },

      invalidNewPassword () {
        return this.errorPassword.new = this.passwordForm.new.length < 6;
      },

      invalidRepeatPassword () {
        return this.errorPassword.repeat = this.passwordForm.new !== this.passwordForm.repeat;
      },
    },
  };
</script>
