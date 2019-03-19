<template>
  <div class="container">
    <h1>有什么新鲜事</h1>
    <div class="action-bar">

    <button class="primary" @click="showThreadForm">发帖</button>
    </div>
    <form @submit.prevent="onSubmit" v-if="ui.threadFormVisibel">
      <input type="text" placeholder="标题" v-model="threadForm.title">
      <textarea placeholder="内容" v-model="threadForm.content"></textarea>
      <button type="submit">提交</button>
    </form>
    <div class="time-line">
      <div v-for="it in threadList" class="activity card">
        <div class="user row">
          <div class="tool">
            <span v-if="user && it.$user && it.$user.id===user.id" class="btn-group">
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
      <ScrollLoad
        :pending="threadReadPending"
        :page="1"
        :totalPage="totalThreadPage"
        @flip="onFlip"
      />
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import dateFormmatter from "../lib/dateFormmatter.js";
import session from "../lib/session.js";
import ScrollLoad from "../components/ScrollLoad";
export default {
  components: { ScrollLoad },
  data() {
    return {
      ui: { threadFormVisibel: false },
      threadReadPending: false,
      threadForm: {},
      threadList: [],
      user: session.user(),
      threadReadParams: {
        limit: 3,
        where: { and: { parent_id: null } },
        with: ["belongs_to:user"]
      },
      totalThreadPage: 1
    };
  },
  mounted() {
    this.threadRead();
  },
  methods: {
    showThreadForm(){
      if(this.user){
        this.ui.threadFormVisibel=!this.ui.threadFormVisibel;
      }else{
        this.$router.push('/login')
      }
    },
    onFlip(page) {
      this.threadReadParams.page = page;
      this.threadRead();
    },
    onSubmit() {
      let url = "thread/create";
      let form = this.threadForm;
      if (!form.title) {
        return;
      }
      form.cat_id = 1;
      form.create_at = dateFormmatter.format(new Date());
      form.user_id = this.user.id;
      if (form.id) {
        url = "thread/update";
      }
      api(url, this.threadForm).then(r => {
        if (!r.success) return;
        // console.log(r.data)
        this.threadList.unshift(r.data)
                    // this.threadList.unshift(r.data);

        this.threadForm = {};
        // this.threadRead();
      });
    },
    threadDelete(id) {
      if (!confirm("确认删除")) return;
      api("thread/delete", { id }).then(r => {
        if (!r.data) return;
        this.threadRead();
      });
    },
    threadRead() {
      this.threadReadPending = true;
      api("thread/read", this.threadReadParams).then(r => {
        this.threadList = [...this.threadList, ...(r.data || [])];
        this.totalThreadPage = Math.ceil(r.total / this.threadReadParams.limit);
        this.threadReadPending = false;
      });
    }
  }
};
</script>

<style scoped>
.action-bar {
  margin: 0.5rem 0;
}

.activity {
  margin: 0.5rem 0;
  padding: 0.5rem;
  position: relative;
}

.activity .content > *,
.activity .title {
  padding-left: 0;
  padding-right: 0;
}

.tool {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.tool * {
  display: inline-block;
  width: auto;
}

.others > * {
  margin-right: 0.3rem;
}
</style>
