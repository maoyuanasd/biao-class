<template>
  <div class="card">
   <div class="title">
      安全设置
    </div>
    <div class="content">
      <dl>
          <dt>密码</dt>
          <dd>
           <button @click="changePasswordVisible=!changePasswordVisible"><span v-if="changePasswordVisible">取消</span>修改密码</button>
          </dd>
        </dl>
    <form @submit.prevent="validateAndChangePassword" v-if="changePasswordVisible">
    <fieldset :disabled="changePasswordPending">
       <div class="input-control">
         <label>
           <span>旧密码</span>
           <input type="password" v-model="passwordForm.old">
           <span class="error" v-if="errorPassword.old">旧密码有误</span>
         </label>
         <label>
           <span>新密码</span>
           <input type="password" v-model="passwordForm.new">
           <span class="error" v-if="errorPassword.new">密码长度应大于6位</span>
         </label>
         <label>
           <span>重复新密码</span>
           <input type="password" v-model="passwordForm.repeat">
           <span class="error" v-if="errorPassword.repeat">两次密码不一致</span>
         </label>
       </div>
       <div class="input-control">
        <button type="submit" v-if="changePasswordVisible">确认修改</button>
       </div>
    </fieldset>
    </form>
    </div>
  </div>
</template>

<script>
import api from '../lib/api.js'
import session from '../lib/session.js'
  export default {
  data() {
    return {
      changePasswordPending:false,
      changePasswordVisible:false,
      passwordForm:{},
      errorPassword:{
        new:false,
        old:false,
        repeat:false,
      },
      user:session.user(),
    }
  },
  methods: {
    validateAndChangePassword(){
      this.invalidNewPassword ();
       if(this.invalidRepeatPassword () || this.invalidNewPassword () ){
         return;
       }
       this.changePasswordPending=true;
       let form = this.passwordForm;
        let user = this.user;
       api('user/find',{id:user.id,only:['password']}).then(r=>{
         if(r.success){
           let invalidOld=form.old===r.data.password;
           if(!invalidOld){
            this.errorPassword.old=true;
            this.changePasswordPending=false;
            return;
           }
           this.changePassword();
            this.errorPassword.old = false;
         }
       })
       
    },
    changePassword(){
      let user = this.user;
      user.password=this.passwordForm.new;
      api('user/update',user).then(r=>{
        if(!r.success){
          alert('密码修改失败');
          return;
        }
        this.passwordForm={};
           this.changePasswordVisible=false; 
          alert('密码修改成功');
      })
    },
    invalidNewPassword (){
      return this.errorPassword.new= !this.passwordForm.new || this.passwordForm.new.length<6;
    },
    invalidRepeatPassword (){
      return this.errorPassword.repeat= !this.passwordForm.repeat || this.passwordForm.new !== this.passwordForm.repeat
    },
  },
  };
</script>
