<template>
  <div class="container">
    <h1>Home</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="标题" v-model="threadForm.title">
      <div class="input-control">
        <div v-if="error.titleExists" class="error">标题不能为空</div>
      </div>
      <textarea placeholder="内容" v-model="threadForm.content"></textarea>
      <button type="submit">提交</button>
    </form>
    <div class="time-line">
      <div v-for="it in threadList" class="activity">
       <div class="user"><strong>{{it.$user ? (it.$user.name || it.$user.username):'已注销'}}</strong></div>
       <div class="tool" v-if="it.user_id==user.id">
         <button @click="threadForm=it">更新</button>
         <button @click="removeThread(it.id)">删除</button>
       </div>
       <div class="title">{{it.title}}</div>
       <div class="content">{{it.content}}</div>
       <div class="others">
         <span>发布于:{{it.create_at}}</span>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import dateFormmatter from "../lib/dateFormmatter.js";
import session from "../lib/session.js";
export default {
  data() {
    return {
      threadForm: {},
      user: session.user(),
      error: {
        titleExists: false
      },
      threadList:{},
    };
  },
  mounted() {
    this.readThread();
  },
  methods: {
    onSubmit() {
      let form = this.threadForm;
      let url='thread/create';
      if (!form.title) {
        this.error.titleExists = true;
        return;
      }
      this.error.titleExists = false;
      form.cat_id = 1;
      form.create_at = dateFormmatter.format(new Date());
      form.user_id = this.user.id;
      if(form.id){
        url='thread/update';
      }
      api(url, this.threadForm).then(r => {
        if(r.success){
          this.threadForm={};
          this.readThread();
        }
      });
    },
    readThread(){
      api('thread/read',{with:['belongs_to:user']}).then(r=>{
        if(r.success)
        this.threadList=r.data;
      })
    },
    removeThread(id){
      if(!confirm('确认删除'))
      return;
      api('thread/delete',{id}).then(r=>{
        if(!r.success)
        return;
        this.readThread();
      })
    }
  }
};
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

  .tool * {
    display: inline-block;
    width: auto;
  }</style>
