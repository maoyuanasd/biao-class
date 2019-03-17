<template>
     <el-card :body-style="{ padding: '0px' }">
         <router-link :to="`/product/${data.id}`">
            <img 
           :src="data.main_img ?  fileUrl(data.main_img[0]) : 'https://mock-cdn.biaoyansu.com/MOCK-FILE-5c81fe7b024292.83724495.jpeg'"
            class="image">
            </router-link>
            <div style="padding: 14px;">
                <router-link :to="`/product/${data.id}`">
              <span :title="data.title">{{data.title | cut(27)}}</span>
                </router-link>
            <p>
                <span class="cny hot">{{data.price}}</span>
            </p>
            </div>
          </el-card>
</template>

<script>
import {fileUrl} from '../lib/helper.js';
export default {
props:['data'],
data() {
    return {
        fileUrl
    }
},
}
</script>

<style>

</style>
