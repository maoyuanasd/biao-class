<template>
  <div class="card">
    <div class="title">
      个人设置
      <button @click="editMode=!editMode">
        <span v-if="editMode">取消</span>编辑
      </button>
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
            <div class="input-control">
            <div v-if="error.usernameExists" class="error">用户名已存在</div>
            <div v-if="error.usernameWrong" class="error">用户名格式错误</div>
            </div>
          </dd>
        </dl>
        <button type="submit" v-if="editMode">完成修改</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
export default {
  data() {
    return {
      me: {},
      meSaved:{},
      editMode: false,
      user: session.user(),
      updatePending: false,
      error: { usernameExists: false,
      usernameWrong:false
       }
    };
  },
  mounted() {
    api("user/find", { id: this.user.id }).then(r => {
      let data=r.data
      this.meSaved = data;
      this.me={...data};
    });
  },
  methods: {
    update() {
      this.updatePending = true;
      let validateUsername = !this.me.username || !/[a-zA-Z0-9]{4,12}/.test(this.me.username);
      if(validateUsername){
       this.updatePending = false;
          this.error.usernameWrong=true;
        return
      }
      api('user/exists',{where:{and:{username:this.me.username}}}).then(r=>{
        let usernameChanged=this.me.username!==this.meSaved.username;
        if(r.data && usernameChanged){
          this.updatePending = false;
          this.error.usernameExists=true;
          return;
        }
      api("user/update", this.me).then(r => {
        if (r.success) {
          this.error.usernameExists=false;
          this.me = r.data;
          this.editMode = false;
          this.updatePending = false;
          this.error.usernameWrong=false;

        }
          // session.login(r.data.id, r.data);
      });
      })
    }
  }
};
</script>
