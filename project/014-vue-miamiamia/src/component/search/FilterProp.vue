<template>
    <div>
         <el-row>
            <el-col :span="3" class="type">{{propName}}</el-col>
            <el-col :span="21">
              <div @click="select(it)" :class="(it.id==selected.id? 'active':'')+' option'" v-for="it in data">{{it.name}}</div>
            </el-col>
          </el-row>
    </div>
</template>

<script>
export default {
props:['data','propName','initId'],
data() {
  return {
    selected:{},
  }
},
created() {
  this.selected.id=this.initId;
},
methods: {
  select(it){
    if(this.selected.id==it.id){
        this.selected={};
        this.$emit('clear',it);
    }else{
      this.selected=it;
      this.$emit('change',it);
    }
  }
},
}
</script>

<style>
.filter .type {
  font-size: 90%;
  opacity: 0.8;
}

.filter .type,
.filter .option {
  display: inline-block;
  cursor: pointer;
  padding: 1em;
}

  .filter .option.active {
    background: #409EFF;
    color: #fff;
  }
</style>
