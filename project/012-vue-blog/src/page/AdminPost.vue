<template>
  <div class="main container">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新文章</h2>
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>内容</label>
        <textarea v-model="current.content"></textarea>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>标题</th>
        <th>内容</th>
        <th>id</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in postList">
          <td>{{it.title}}</td>
          <td>{{it.content}}</td>
          <td>{{it.id}}</td>
          <td>
            <button>更新</button>
            <button @click="onClick">删除</button>
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
  mounted() {
    this.read();
  },
  methods: {
    onSubmit() {
      this.createOrupdate();
    },
    onClick() {
        console.log(this.current)
    },
    createOrupdate() {
      let action;
      action = this.current.id ? "update" : "create";
      api(`post/${action}`, this.current).then(r => {
        this.read();
      });
    },
    remove() {
      api('post/delete', this.current.id);
    },
    read() {
      api('post/read').then(r => {
        this.postList = r.data;
      });
    }
  }
};
</script>
<style>
.main {
  max-width: 500px;
}
.main > * {
  margin: 1em;
}
</style>

