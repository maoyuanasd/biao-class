<template>
  <div class="main container">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新文章</h2>
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>分类</label><br>
        <select v-model="current.cat_id">
          <option v-for="it in catList" :value="it.id">{{it.name}}</option>
        </select>
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
        <th>分类</th>
        <th>内容</th>
        <th>id</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in postList">
          <td>{{it.title}}</td>
          <td>{{it.$cat? it.$cat.name:'-'}}</td>
          <td :title="it.content">{{it.content |cut(it.content)}}</td>
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
      postList: [],
      catList:[],
    };
  },
  filters:{
    cut(value){
         return value.length<12 ? value:value.substring(0,12)+'...';
    }
  },
  mounted() {
    this.read();
      this.readCat();

  },
  methods: {
    onSubmit() {
      this.createOrupdate();
      this.current={};
    },
    createOrupdate() {
      let action;
      action = this.current.id ? "update" : "create";
      api(`post/${action}`, this.current).then(r => {
        this.read();
      });
    },
    remove(id) {
      if(!confirm('确认删除'))
      return;
      
      api('post/delete', {id}).then(r=>{
        if(r.success)
        this.read();
      });
    },
    read() {
      let param={
        with:`belongs_to:cat`,
      }
      api('post/read',param).then(r => {
        this.postList = r.data;
      });
    },
    readCat() {
      api('cat/read').then(r => {
        this.catList = r.data;
      });
    },
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

