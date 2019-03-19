<template>
  <div class="container">
    <h1>{{row.title}}</h1>
    <div class="post-content">{{row.content}}</div>
    <div class="comment-area">
      <button @click="commentFormVisible=!commentFormVisible">评论</button>
      <form @submit.prevent="createComment" v-if="commentFormVisible" class="comment-form">
        <input type="email" placeholder="请输入你的邮箱" v-model="commentForm.email">
        <textarea placeholder="有什么想说的" v-model="commentForm.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div v-for="it in commentList" class="comment">
          <div class="email">{{it.email}} <span v-if="it.reply_to">回复{{it.$reply_to.email}}的评论</span></div>
          <div class="content">{{it.content}}</div>
          <button @click="fillReply(it)">回复</button>
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
      row: {},
      commentFormVisible: false,
      commentForm: {},
      commentList: [],
      id: null
    };
  },
  mounted() {
    let id = (this.id = this.$route.params.id);
    this.commentForm.post_id = id;
    this.findPost(id);
    this.readComment();
  },
  methods: {
    findPost(id) {
      api("post/find", { id }).then(r => {
        if (r.success) this.row = r.data;
      });
    },
    createComment() {
      api("comment/create", this.commentForm).then(r => {
        if (r.success) {
          this.commentFormVisible = false;
          this.commentForm = {};
          this.readComment();
        }
      });
    },
    readComment() {
      let param = {
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
      };
      api("comment/read", param).then(r => {
        if (r.success) this.commentList = r.data;
      });
    },
    fillReply (target) {
        this.commentForm.reply_to = target.id;
        this.commentFormVisible   = true;
      },
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

