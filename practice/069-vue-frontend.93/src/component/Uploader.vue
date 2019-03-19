<template>
    <input type="file" @change="onFill">
</template>

<script>
import api from '../lib/api.js'
export default {
    props:['manualUpload'],
data() {
    return {
        
    }
},
methods: {
    onFill(e){
        let input=e.target;
        let file=input.files[0]
       let fd=new FormData();
       fd.append('file',file);
       this.$emit('change',file);
       if(!this.manualUpload){
           api('_file/create',fd).then(r=>{
               if(r.success){
                   this.$emit('upload',r.data)
                   input.value='';
               }else{
                   this.$emit('upload',r)
               }
           })
       }
    },
},
}
</script>

<style>

</style>
