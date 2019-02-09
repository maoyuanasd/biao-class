<template>
  <div class="card">
    <div class="title">
      个人设置
      <button @click="editMode=!editMode"><span v-if="editMode">取消</span>编辑</button>
    </div>
    <form @submit.prevent="update">
    <fieldset :disabled="updatePending">
       <dl>
          <dt>昵称</dt>
          <dd>
             <span v-if="!me.name && !editMode">-</span>
            <input class="field" type="text" v-model="me.name" :readonly="!editMode">
          </dd>
        </dl>
       <dl>
          <dt>自我介绍</dt>
          <dd>
             <span v-if="!me.intro && !editMode">-</span>
            <input class="field" type="text" v-model="me.intro" :readonly="!editMode">
          </dd>
        </dl>
       <dl>
          <dt>用户名</dt>
          <dd>
             <span v-if="!me.username && !editMode">-</span>
            <input class="field" type="text" v-model="me.username" :readonly="!editMode">
          </dd>
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
 updatePending:false
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
        if(r.success){
          this.me=r.data;
          this.editMode=false;
           this.updatePending = false;
           session.login(r.data.id,r.data)
        }
      })
    }
  },
};
</script>
