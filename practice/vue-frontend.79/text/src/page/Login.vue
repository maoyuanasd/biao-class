<template>
  <div>
    <div class="form-container">
      <h1>登录</h1>
      <form @submit.prevent="login">
        <div class="input-control">
          <label>
            <span class="field">用户名</span>
            <input v-model="current.username">
            <span v-if="error.username" class="error">{{error.username}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <span class="field">密码</span>
            <input type="password" v-model="current.password">
            <span v-if="error.password" class="error">{{error.password}}</span>
          </label>
        </div>
        <div class="input-control">
          <div v-if="error.invalidMatch" class="error">用户名或密码有误</div>

          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import api     from '../lib/api';
  import session from '../lib/session';

  export default {
    data () {
      return {
        current : {
          username  : null,
          password  : null,
          password2 : null,
        },
        error   : {
          invalidMatch : false,
        },
      };
    },
    methods : {
      login () {
        let c        = this.current;
        let username = c.username;
        let password = c.password;

        if (!username || !password)
          return;

        let param = { where : { and : { username, password } } };

        api('user/first', param)
          .then(r => {
            let user = r.data;
            if (!user) {
              this.error.invalidMatch = true;
              return;
            }

            session.login(user.id, user, '/');
          });
      },
    },
  };
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
