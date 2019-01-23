<template>
  <div class="container main">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新文章</h2>
      <div class="input-box">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-box">
        <label>内容</label>
        <textarea type="text" v-model="current.content"></textarea>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>标题</th>
        <th>内容</th>
        <th>ID</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in postList">
          <td>{{it.title}}</td>
          <td :title="it.content">{{it.content |cut}}</td>
          <td>{{it.id}}</td>
          <td>
            <button @click="remove(it.id)">删除</button>
            <button @click="current=it">更新</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import "../css/admin.css";
import api from "../lib/api.js";
export default {
  data() {
    return {
      current: {},
      postList: []
    };
  },
  filters:{
      cut (value){
          return value.length<12 ? value : value.substring(0,12)+'...';
      }
  },
  mounted() {
    this.read();
  },
  methods: {
    onSubmit() {
      this.createOrUpdate();
    },
    createOrUpdate() {
        if(!this.current.title && !this.current.content )
        return;
      let action;
      action = this.current.id ? "update" : "create";
      api(`post/${action}`, this.current).then(r => {
        if (r.success) {
          this.resetForm();
          this.read();
        }
      });
    },
    remove(id) {
      if (!confirm("确认删除")) return;
      api("post/delete", { id }).then(r => {
        if (r.success) this.read();
      });
    },
    read() {
      api("post/read").then(r => {
        if (r.success) this.postList = r.data;
      });
    },
    resetForm() {
      this.current = {};
    }
  }
};
</script>
<style>
.main {
  max-width: 500px;
}
</style>

