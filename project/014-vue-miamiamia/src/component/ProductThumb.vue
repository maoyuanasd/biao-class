<template>
    <div>
        <img :src="url" alt="">
    </div>
</template>

<script>
import holder from '../config/holder.js'
import {fileUrl} from '../lib/helper.js'
export default {
    props:['row'],
computed: {
    url(){
      if(!this.row.main_img || !this.row.main_img.length)
      return holder.productMainImg;

      return fileUrl(this.row.main_img[0]);
    }
},
}
</script>

<style>

</style>
