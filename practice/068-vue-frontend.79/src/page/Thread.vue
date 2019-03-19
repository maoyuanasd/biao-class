<template>
  <div class="container">
    <div class="thread-container">
      <div v-if="current.title">
        <h2>{{current.title}}</h2>
        <div class="info">
          <span>作者:{{name(current)}}</span>
          <span>发布于:{{current.create_at}}</span>
        </div>
        <div class="sub-thread head">
          <div class="content">{{current.content}}</div>
        </div>
        <div v-if="subList.length">
          <div v-for="it in subList" class="sub-thread">
            <div class="content">{{it.content}}</div>
            <div class="others">
              <strong>{{name(it)}}</strong>
              <span class="small muted">发布于:{{it.create_at}}</span>
            </div>
          </div>
        </div>
        <div v-else class="empty-holder">暂无跟帖</div>
      </div>
      <div v-else>加载中...</div>
      <div class="input-control">
        <form @submit.prevent="createSub">
          <textarea v-model="form.content" placeholder="说出你的想法"></textarea>
          <button type="submit">回帖</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import name from "../lib/name.js";
import api from "../lib/api.js";
import dateFormmatter from "../lib/dateFormmatter.js";
import session from "../lib/session.js";
export default {
  data() {
    return {
      current: {},
      name,
      id: null,
      form: {},
      user: session.user(),
      subList: []
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.find(this.id);
    this.readSub();
  },
  methods: {
    find(id) {
      api("thread/find", { id, with: ["belongs_to:user"] }).then(r => {
        this.current = r.data;
      });
    },
    createSub() {
      let form = this.form;
      form.cat_id = 1;
      form.create_at = dateFormmatter.format(new Date());
      form.parent_id = this.id;
      form.user_id = this.user.id;
      api("thread/create", form).then(r => {
        this.readSub();
        this.form = {};
      });
    },
    readSub() {
      let params = {
        where: { and: { parent_id: this.id } },
        with: ["belongs_to:user"]
      };
      api("thread/read", params).then(r => {
        this.subList = r.data || [];
      });
    }
  }
};
</script>

<style>
.info > * {
  margin-right: 0.3em;
}

.user .name {
  font-weight: bold;
}

.thread-container {
  background: #fff;
  padding: 0.5rem;
}

.sub-thread {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0;
}

.others > * {
  margin-right: 0.3rem;
}

.content {
  white-space: pre-line;
}
</style>
