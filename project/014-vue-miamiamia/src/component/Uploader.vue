<template>
    <div>
        <input type="file" @change="onFill">
    </div>
</template>

<script>
import api from '../lib/api.js'
export default {
    props:['manualUpload'],
data() {
    return {
        file:null
    }
},
methods: {
    onFill(e){
        let input=e.target
     let file= this.file=e.target.files[0];
        let fd= new FormData();
        if(!file)
        return;
        fd.append("file",file);
      this.$emit('change',file);
      if(!this.manualUpload){
          api('_file/create',fd).then(r=>{
              if(r.success){
                  this.$emit('upload',r.data);
                   input.value='';
              }
              else
               this.$emit('upload',r);
          })
      }
    }
},
}
</script>

<style>

</style>
