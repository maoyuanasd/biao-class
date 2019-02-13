<template>
<div class="container">
  <h1>Home</h1>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="标题" v-model="threadForm.title">
    <textarea placeholder="内容" v-model="threadForm.content"></textarea>
    <button type="submit">提交</button>
  </form>
  <div class="time-line">
    <div v-for="it in threadList" class="activity">
      <div class="user row">
        <div class="tool">
          <span v-if="user && it.$user && it.$user.id===user.id">
            <button @click="threadForm=it">编辑</button>
            <button @click="threadDelete(it.id)">删除</button>
          </span>
        </div>
      </div>
      <router-link :to="'/thread/'+it.id" class="title">{{it.title}}</router-link>
      <div class="content">{{it.content}}</div>
      <div class="others">
        <strong>{{it.$user? (it.$user.name || it.$user.username):'已注销'}}</strong>
      <span class="small muted">发布于:{{it.create_at}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '../lib/api.js'
import dateFormmatter from '../lib/dateFormmatter.js'
import session from '../lib/session.js'
export default {
  data(){
    return {
      threadForm : {},
      threadList:[],
      user:session.user()
    }
  },
  mounted() {
    this.threadRead();
  },
  methods: {
    onSubmit(){
      let url='thread/create';
      let form=this.threadForm;
      if(!form.title){
        return;
      }
      form.cat_id=1;
      form.create_at=dateFormmatter.format(new Date());
      form.user_id=this.user.id;
      if(form.id){
        url='thread/update'
      }
      api(url,this.threadForm).then(r=>{
        if(!r.success)
        return;
        this.threadForm={};
         this.threadRead();
      })
    },
    threadDelete(id){
      if(!confirm('确认删除'))
      return;
      api('thread/delete',{id}).then(r=>{
        if(!r.data)
        return;
         this.threadRead();
      })
    },
   threadRead(){
     api('thread/read',{where:{and:{parent_id:null}}, with:['belongs_to:user']}).then(r=>{
       this.threadList=r.data;
     })
   }
  },
}
</script>

<style scoped>
 .activity {
    margin: .5rem 0;
    border: 2px solid;
    padding: .5rem;
    position: relative;
  }

  .tool {
    position: absolute;
    right: .5rem;
    top: .5rem;
  }
 .title{
   font-size: 1.3rem;
   font-weight: bold;
 }
  .tool * {
    display: inline-block;
    width: auto;
  }
  .others > * {
    margin-right: .3rem;
  }
  </style>
