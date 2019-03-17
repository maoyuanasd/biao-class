<template>
    <div>
          <el-row>
            <el-col :span="3" class="type">{{filterName}}</el-col>
            <el-col :span="21">
               <div @click="select(it)" v-for="it in data"  :class="(it.id==selected.id? 'active':'')+' option'">{{it.name}}</div>
            </el-col>
          </el-row>
    </div>
</template>

<script>
export default {
props:['filterName','data','initial'],
data() {
    return {
        selected:{}
    }
},
mounted() {
  this.selected.id=this.initial;
},
created() {
  this.$set(this.selected,'id',this.initial);
  
},
methods: {
    select(it){
        if(this.selected && it.id==this.selected.id){
            this.selected={};
            this.$emit('clear',it);
            return
        }
         this.selected=it;
         this.$emit('change',it);
    }
},
}
</script>

<style>
.filter {
  color: #666;
}

.filter > * {
  margin-bottom: 0.5em;
}

.filter .table > * {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-width: 0;
}

.filter .table > *:last-child {
  border-bottom-width: 1px;
}

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
