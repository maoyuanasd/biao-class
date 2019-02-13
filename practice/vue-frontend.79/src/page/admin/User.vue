<template>
  <div class="panel">
    <h1>用户管理</h1>
    <div class="toolbar">
      <button @click="ui.showForm=!ui.showForm">创建</button>
    </div>
    <form v-if="ui.showForm" @submit.prevent="createOrUpdate">
      <div class="input-control">
        <label>
          <span class="title">昵称</span>
          <input type="text" v-model="form.name">
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">用户名</span>
          <input type="text" v-model="form.username">
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">签名</span>
          <input type="text" v-model="form.intro">
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">密码</span>
          <input type="password" v-model="form.password">
        </label>
      </div>
      <div class="input-control">
        <label>
          <button type="submit">提交</button>
        </label>
      </div>
    </form>
    <table>
      <thead>
        <th>昵称</th>
        <th>用户名</th>
        <th>签名</th>
        <th>密码</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list">
          <th>{{it.name || '-'}}</th>
          <th>{{it.username || '-'}}</th>
          <th>{{it.intro || '-'}}</th>
          <th>{{it.password}}</th>
          <th>
            <div class="btn-group">
            <button @click="fill(it)">更新</button>
            <button @click="remove(it.id)">删除</button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../../lib/api.js";
export default {
  data() {
    return {
      form: {},
      ui: {
        showForm: false
      },
      list: []
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    createOrUpdate() {
      let action = "create";
      let isUpdate = this.form.id;
      if (isUpdate) action = "update";
      api(`user/${action}`, this.form).then(r => {
        this.resetForm();
        this.read();
        this.hideForm();
      });
    },
    hideForm() {
      this.ui.showForm = false;
    },
    showForm() {
      this.ui.showForm = true;
    },
    resetForm() {
      this.form = {};
    },
    read() {
      api("user/read").then(r => {
        this.list = r.data;
      });
    },
    fill(it){
      this.form=it;
      this.showForm();
    },
    remove(id){
      if(!confirm('确认删除'))
      return;
      api('user/delete',{id}).then(r=>{
        this.read();
      })
    }
  }
};
</script>

<style></style>
