<template>
  <div class="container">
    <h1>{{row.title}}</h1>
    <div>
      <h2>分类:{{row.$cat? row.$cat.name:'-'}}</h2>
    </div>
    <div class="post-content">{{row.content}}</div>
    <div class="comment-area">
      <button @click=" commentFormVisible=!commentFormVisible">评论</button>
      <form class="comment-form" v-if="commentFormVisible" @submit.prevent="createComment">
        <input type="email" placeholder="请输入你的邮箱" v-model="comment.email">
        <textarea placeholder="有什么想说的" v-model="comment.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div class="comment" v-for="it in commentList">
          <div class="email">
            {{it.email}}
            <span v-if="it.reply_to">回复{{it.$reply_to? it.$reply_to.email:'null'}}的评论</span>
          </div>
          <div class="content">{{it.content}}</div>
          <button @click="fillReply(it)">回复</button>
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
      row: {},
      id: null,
      commentFormVisible: false,
      comment: {},
      commentList: []
    };
  },
  mounted() {
    this.id = this.comment.post_id = this.$route.params.id;
    this.findPost(this.id);
    this.readComment();
  },
  methods: {
    findPost(id) {
      let param = {
        id,
        with: [
          {
            model: "cat",
            relation: "belongs_to"
          }
        ]
      };
      api("post/find", param).then(r => {
        if (r.success) this.row = r.data;
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
        if (r.success) {
          // console.log(r)
          this.commentList = r.data;
        }
      });
    },
    createComment() {
      api("comment/create", this.comment).then(r => {
        if (r.success) {
          this.readComment();
          this.comment = {};
          this.commentFormVisible = true;
        }
      });
    },
    removeComment(id) {
      api("comment/delete", { id }).then(r => {
        if (!confirm("确认删除")) return;
        if (r.success) {
          this.readComment();
        }
      });
    },
    fillReply(target) {
      this.commentFormVisible = true;
      this.comment.reply_to = target.id;
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
