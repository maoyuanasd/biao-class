<template>
  <div class="container main col">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新分类</h2>
      <div class="input-control">
        <label>名称</label>
        <input type="text" v-model="current.name">
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>名称</th>
        <th>ID</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list">
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
import '../css/admin.css';
import api from '../lib/api.js';
export default {
  data() {
    return {
      list: [],
      current: {}
    };
  },
 
  mounted() {
    this.read();
  },
  methods: {
    onSubmit() {
      this.createOrUpdate();
    },
    read() {
      api('cat/read').then(r => {
        if (r.success) {
          this.list = r.data;
        }
      });
    },
    createOrUpdate() {
      let action;
      action = this.current.id ? 'update' : 'create';
      api(`cat/${action}`, this.current).then(r => {
        if (r.success) {
          this.read();
          this.current = {};
        }
      });
    },
    remove(id){
        if(!confirm('确认删除'))
        return;
        api('cat/delete',{id}).then(r=>{
            if(r.success)
            this.read();
        })
    }
  }
};
</script>
<style>

</style>