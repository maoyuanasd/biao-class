<template>
  <div class="main container">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新分类</h2>
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.name">
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
        <th>id</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in catList">
          <td>{{it.name}}</td>
          <td>{{it.id}}</td>
          <td>
            <button @click="current=it">更新</button>
            <button @click="remove(it.id)">删除</button>
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
      catList: []
    };
  },
 
  mounted() {
    this.read();
  },
  methods: {
    onSubmit() {
      this.createOrupdate();
    },
    createOrupdate() {
      let action;
      action = this.current.id ? "update" : "create";
      api(`cat/${action}`, this.current).then(r => {
        this.read();
      });
    },
    remove(id) {
      if(!confirm('确认删除'))
      return;
      
      api('cat/delete', {id}).then(r=>{
        if(r.success)
        this.read();
      });
    },
    read() {
      api('cat/read').then(r => {
        this.catList = r.data;
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

