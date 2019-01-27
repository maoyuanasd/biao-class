<template>
    <div class="container">
      <div class="postList">
          <div class="post" v-for="it in postList">
              <router-link :to="'/post/'+it.id">{{it.title}}</router-link>
              <div class="preview">{{it.content}}</div>
          </div>
      </div>
    </div>
</template>
<script>
import api from '../lib/api.js'
export default {
    data() {
        return {
            post:{},
            postList:[]
        }
    },
    mounted() {
        this.readPost()
    },
    methods:{
    readPost(){
        api('post/read').then(r=>{
            if(r.success)
            this.postList=r.data;
        })
    }
    }
}
</script>
