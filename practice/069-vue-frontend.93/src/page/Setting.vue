<template>
  <div>
    <h1>设置</h1>
    <div class="toolbar">
      <button @click="editMode = !editMode">
        <span v-if="editMode">取消</span>
        <span v-else>编辑</span>
      </button>
    </div>
    <form @submit.prevent="update()">
      <fieldset :disabled="updatePending">
      <dl class="pair">
        <dt>昵称</dt>
        <dd>
          <span v-if="editMode">
          <input type="text" v-model="me.nickname">
          </span>
          <span v-else>
             {{me.nickname || '-'}}
          </span>
        </dd>
      </dl>
      <dl class="pair">
        <dt>手机号</dt>
        <dd>
          <span v-if="editMode">
          <input type="text" v-model="me.phone">
          <span v-if="me.phone != meCopy.phone && is.phone(me.phone)">
             <input type="text" v-model="tmp.input.phone">
             <captcha  @send="storeCaptcha('phone',$event)" sendBy="phone" :receiver="me.phone"/>
          </span>
          </span>
          <span v-else>
             {{me.phone || '-'}}
          </span>
        </dd>
      </dl>
      <dl class="pair">
        <dt>邮箱</dt>
        <dd>
          <span v-if="editMode">
          <input type="text" v-model="me.mail">
           <span v-if="me.mail != meCopy.mail && is.mail(me.mail)">
             <input type="text" v-model="tmp.input.mail">
             <captcha @send="storeCaptcha('mail',$event)" sendBy="mail" :receiver="me.mail"/>
          </span>
          </span>
          <span v-else>
             {{me.mail || '-'}}
          </span>
        </dd>
      </dl>
      <div class="error-list">
        <div v-for="e in errorMsg" class="error">{{e}}</div>
      </div>
      <div v-if="editMode">
          <button class="el-button--primary" type="submit">完成</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
import api from '../lib/api.js'
import session from '../lib/session.js'
import {is} from '../lib/valee.js'
import Captcha from '../component/Captcha'
export default {
  components:{Captcha},
   data() {
     return {
       editMode:false,
       updatePending:false,
       me:{},
       meCopy:{},
       errorMsg:[],
       tmp:{
         input:{},
         recove:{}
       },
      
       is
     }
   },
   mounted() {
     this.findMe();

   },
   methods: {
     validate(){
       this.errorMsg=[];
       let me =this.me;
       if(!this.changed('phone')){
         if(!is.phone(me.phone))
         this.errorMsg.push('手机号不合法');
       }
      if(!this.changed('mail')){
        if(!is.mail(me.mail))
        this.errorMsg.push('邮箱不合法');
      }
      if(! this.verifyCaptcha('phone'))
      this.errorMsg.push('手机验证码不正确');
      if(! this.verifyCaptcha('mail'))
      this.errorMsg.push('邮箱验证码不正确');
      return this.errorMsg.length
     },
     changed(type){
       return this.me[type]==this.meCopy[type];
     },
     findMe(){
      api('user/find',{id:session.user().id}).then(r=>{
        this.me=r.data;
        this.copyMe();
      })
     },
     copyMe(){
       this.meCopy={...this.me}
     },
     storeCaptcha(type,code){
          this.tmp.recove[type]=code;
     },
     verifyCaptcha(type){
       return this.tmp.input[type] == this.tmp.recove[type];
     },
     update(){
       console.log(this.validate())
       if(this.validate()!=0)
       return;
       this.updatePending=true;
       api('user/update',this.me).then(r=>{
         let me=this.me=r.data;
         this.editMode=false;
         this.updatePending=false;
          this.copyMe();
          session.login(me.id,me);
       })
     }
   },
   watch: {
     me:{
       deep:true,
       handler(){
         if(this.editMode)
         this.validate();
       }
     }
   },
}
</script>