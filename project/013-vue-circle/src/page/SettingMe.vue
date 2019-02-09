<template>
  <div class="card">
   <div class="title">基础设置<button @click="editMode=!editMode"><span v-if="editMode">取消</span>编辑</button></div>
   <form @submit.prevent="update">
     <fieldset :disabled="updatePending">
     <dl>
       <dt>昵称</dt>
       <span v-if="!editMode && !me.name">-</span>
       <dd><input type="text" v-model="me.name" :readonly="!editMode"></dd>
     </dl>
     <dl>
       <dt>简介</dt>
       <span v-if="!editMode && !me.intro">-</span>
       <dd><input type="text" v-model="me.intro" :readonly="!editMode"></dd>
     </dl>
     <dl>
       <dt>用户名</dt>
       <span v-if="!editMode && !me.username">-</span>
       <dd><input type="text" v-model="me.username" :readonly="!editMode"></dd>
     </dl>
     <button type="submit" v-if="editMode">完成修改</button>
     </fieldset>
   </form>
  </div>
</template>

<script>
import api from '../lib/api.js'
import session from '../lib/session.js'
export default {
  data() {
    return {
      me:{},
      editMode:false,
      user:session.user(),
      updatePending:false,
    }
  },
  mounted() {
    api('user/find',{id:this.user.id}).then(r=>{
      this.me=r.data;
    })
  },
  methods: {
    update(){
      this.updatePending=true;
      api('user/update',this.me).then(r=>{
        if(!r.success){
            alert('设置失败');
            updatePending=false;
            return;
          }
          this.me=r.data;
          this.editMode=false;
          this.updatePending=false;
          session.login(r.data.id,r.data);
      })
    }
  },
};
</script>
