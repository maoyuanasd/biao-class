<template>
<div class="container">
    <h1>近期文章</h1>
    <div class="post-list">
        <div v-for="it in postList" class="post">
            <router-link :to="'/post/'+it.id"><h2>{{it.title}}</h2></router-link></router-link>
            <div class="preview">{{it.content}}</div>
        </div>
    </div>
</div>
</template>
<script>
import api from '../lib/api.js'
export default {
    data(){
        return {
            postList:[],
        }
    },
    mounted() {
        this.readPost()
    },
    methods: {
        readPost(){
           api('post/read').then(r=>{
               if(r.success)
               this.postList=r.data;
           })   
        }
    },
}
</script>