<template>
  <div class="container main col">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新文章</h2>
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>分类</label><br>
        <select v-model="current.cat_id">
          <option v-for="it in catList" :value="it.id" >{{it.name}}</option>
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
        <th>ID</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list">
          <td>{{it.title}}</td>
          <td>{{it.$cat? it.$cat.name:'-'}}</td>
           <td :title="it.content">{{it.content |cut}}</td>
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
import '../css/admin.css';
import api from '../lib/api.js';
export default {
  data() {
    return {
      list: [],
      current: {},
      catList:[],
    };
  },
  filters:{
      cut (value){
          if(!value)
          return;
          return value.length<12 ? value : value.substring(0,12)+'...';
      }
  },
  mounted() {
    this.read();
    this.readCat();
  },
  methods: {
    onSubmit() {
      this.createOrUpdate();
    },
    read() {
       let param = {
        with:`belongs_to:cat`,
       
      };
      api('post/read',param).then(r => {
        if (r.success) {
          this.list = r.data;
        }
      });
    },
    createOrUpdate() {
      let action;
      action = this.current.id ? 'update' : 'create';
      api(`post/${action}`, this.current).then(r => {
        if (r.success) {
          this.read();
          this.current = {};
        }
      });
    },
    remove(id){
        if(!confirm('确认删除'))
        return;
        api('post/delete',{id}).then(r=>{
            if(r.success)
            this.read();
        })
    },
    readCat(){
      api('cat/read').then(r=>{
        if(r.success)
        this.catList=r.data;
      })
    }
  }
};
</script>
<style>

</style>