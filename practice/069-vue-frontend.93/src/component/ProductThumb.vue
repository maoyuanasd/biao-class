<template>
    <div>
        <img :src="url">
    </div>
</template>

<script>
import {fileUrl} from '../lib/helper.js'
import holder from '../config/holder.js'
export default {
props:['data'],
computed: {
    url(){
        let d=this.data;
        let img=d.main_img;
        if(!img || !img.length)
        return holder.productMainImg;
    return    fileUrl(img[0]);
    }
},
}
</script>

<style>

</style>
