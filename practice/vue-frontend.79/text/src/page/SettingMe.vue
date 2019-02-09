<template>
  <div class="card">
    <div class="title">设置基础信息
      <button @click="editMode = !editMode">
        <span v-if="editMode">取消</span>编辑</button>
    </div>
    <form @submit.prevent="update" class="content">
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
        <button v-if="editMode" type="submit">完成修改</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import store from '../lib/store';
  import api   from '../lib/api';

  export default {
    mounted () {
      api('user/find', { id : store.get('user').id })
        .then(r => {
          this.me = r.data;
        });
    },
    data () {
      return {
        me            : {}, // 当前用户的数据
        editMode      : false, // 是否为编辑模式
        updatePending : false,
      };
    },
    methods : {
      update () {
        this.updatePending = true;
        api('user/update', this.me)
          .then(r => {
            this.me            = r.data;
            this.editMode      = false;
            this.updatePending = false;
          });
      },
    },
  };
</script>
