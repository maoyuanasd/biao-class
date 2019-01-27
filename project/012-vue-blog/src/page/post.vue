<template>
  <div class="main container">
      <h2>{{row.title}}</h2>
      <h3>分类:{{row.$cat? row.$cat.name:'-'}}</h3>
      <div class="post-content">{{row.content}}</div>
      <div class="comment-area">
        <button @click="commentFormVisible=!commentFormVisible">评论</button>
        <form class="comment-form" v-if="commentFormVisible" @submit.prevent="createComment">
          <input type="email" placeholder="请输入邮箱" v-model="commentForm.email">
          <textarea placeholder="有什么想说的" v-model="commentForm.content"></textarea>
          <button type="submit">提交</button>
        </form>
        <div class="comment-list">
          <div class="comment" v-for="it in commentList">
            <div class="email">{{it.email}} <span v-if="it.reply_to">回复{{it.$reply_to? it.$reply_to.email:'null'}}的评论</span></div>
            <div class="content">{{it.content}}</div>
            <button @click="fillReply(it.id)">回复</button>
            <button @click="removeComment(it.id)">删除</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import api from "../lib/api.js";
export default {
  data() {
    return {
      row:{},
      id:null,
      commentFormVisible:false,
      commentForm: {},
      commentList: [],
    };
  },
 
  mounted() {
  this.id=this.commentForm.post_id=this.$route.params.id;
    this.findPost(this.id);
     this.readComment();
  },
  methods: {
   findPost(id){
     let param={
       id,
       with:`belongs_to:cat`,
     }
       api('post/find',param).then(r=>{
         if(r.success)
         this.row=r.data;
       })
   },
   createComment(){
     api('comment/create',this.commentForm).then(r=>{
       if(r.success){
          this.commentForm={};
          this.commentFormVisible=false;
         this.readComment();
       }
     })
   },
   readComment(){
     let params={
        with: [
          {
            model: "comment",
            relation: "belongs_to",
            foreign_key: "reply_to",
            as: "reply_to"
          }
        ],
       where: {
          and: { post_id: this.id }
        }
     }
     api('comment/read',params).then(r=>{
       console.log(r)
       this.commentList=r.data;
     })
   },
   fillReply(id){
  this.commentFormVisible=true;
  this.commentForm.reply_to=id;
   },
   removeComment(id){
     if(!confirm('确认删除'))
     return;
        api('comment/delete',{id}).then(r=>{
          this.readComment();
        })
   }

  }
};
</script>
<style>
.post-content {
  white-space: pre-wrap;
}
.comment-area {
  margin: 0.5em 0;
}

.comment-form {
  margin-left: 0;
}

.comment {
  margin: 0.5em 0;
}
</style>