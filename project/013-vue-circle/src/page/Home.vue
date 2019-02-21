<template>
  <div class="container">
    <h1>有什么新鲜事</h1>
    <div class="action-bar">
      <button class="primary" @click="showThreadForm">发帖</button>
    </div>
    <form @submit.prevent="onSubmit" v-if="ui.threadFormVisibel">
      <input type="text" placeholder="标题" v-model="threadForm.title">
      <div class="input-control">
        <div v-if="error.titleExists" class="error">标题不能为空</div>
      </div>
      <textarea placeholder="内容" v-model="threadForm.content"></textarea>
      <button type="submit">提交</button>
    </form>
    <div class="time-line">
      <div v-for="it in threadList" class="activity card">
        <div class="user">
          <!-- <strong>{{it.$user ? (it.$user.name || it.$user.username):'已注销'}}</strong> -->
        </div>
        <div class="tool" v-if="user && it.user_id==user.id">
          <button @click="threadForm=it">更新</button>
          <button @click="removeThread(it.id)">删除</button>
        </div>
        <router-link :to="'/thread/'+it.id" class="title">{{it.title}}</router-link>
        <div class="content">{{it.content}}</div>
        <div class="others">
          <span>
          <strong>{{it.$user ? (it.$user.name || it.$user.username):'已注销'}}</strong>
          </span>
          <span class="small mute">发布于:{{it.create_at}}</span>
        </div>
      </div>
      <ScrollLoad :page="1" @flip="onFlip" :totalPage="totalThreadPage" :pending="threadReadPending"/>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import dateFormmatter from "../lib/dateFormmatter.js";
import session from "../lib/session.js";
import ScrollLoad from '../components/ScrollLoad'
export default {
  components:{ScrollLoad},
  data() {
    return {
      ui:{
        threadFormVisibel:false
      },
      threadForm: {},
      user: session.user(),
      error: {
        titleExists: false
      },
      threadList: [],
      readThreadParams:{
        limit:3,
        where: { and: { parent_id: null } },
        with: ["belongs_to:user"]
      },
      totalThreadPage:1,
      threadReadPending:false,
    };
  },
  mounted() {
    this.readThread();
  },
  methods: {
    showThreadForm(){
      if(this.user){
        this.ui.threadFormVisibel=!this.ui.threadFormVisibel
      }else{
        this.$router.push('/login')
      }
    },
    onFlip(page){
      this.readThreadParams.page=page
     this.readThread();
    },
    onSubmit() {
      let form = this.threadForm;
      let url = "thread/create";
      if (!form.title) {
        this.error.titleExists = true;
        return;
      }
      this.error.titleExists = false;
      form.cat_id = 1;
      form.create_at = dateFormmatter.format(new Date());
      form.user_id = this.user.id;
      if (form.id) {
        url = "thread/update";
      }
      api(url, this.threadForm).then(r => {
        if (r.success) {
          this.threadForm = {};
          location.reload();
          // this.readThread();
        }
      });
    },
    readThread() {
      this.threadReadPending=true;
      api("thread/read",this.readThreadParams ).then(r => {
        if (r.success){
          this.threadList = [...this.threadList,...r.data || []];
          this.totalThreadPage=Math.ceil(r.total/this.readThreadParams.limit);
          this.threadReadPending=false;
        } 
      });
    },
    removeThread(id) {
      if (!confirm("确认删除")) return;
      api("thread/delete", { id }).then(r => {
        if (!r.success) return;
        this.readThread();
      });
    }
  }
};
</script>

<style scoped>
 .action-bar {
    margin: .5rem 0;
  }

  .activity {
    margin: .5rem 0;
    padding: .5rem;
    position: relative;
  }

  .activity .content > *,
  .activity .title {
    padding-left: 0;
    padding-right: 0;
  }

  .tool {
    position: absolute;
    right: .5rem;
    top: .5rem;
  }

  .tool * {
    display: inline-block;
    width: auto;
  }

  .others > * {
    margin-right: .3rem;
  }
</style>
