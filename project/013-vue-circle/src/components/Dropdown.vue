<template>
<div>
    <div class="dropdown">
        <div class="filter">
            <input type="search" v-model="keyword" @focus="visible=true;reset()" @blur="hideResult();$emit('blur')">
        </div>
        <div class="list" v-if="visible">
            <div class="option" v-for="it in result" @mousedown="select(it)">{{it[displayBy]}}</div>
        </div>
    </div>

</div>
</template>
<script>
import api from '../lib/api.js'
export default {
  props:['list','displayBy','searchBy','onSelect','api'],
  data() {
      return {
          result:[],
          keyword:'',
          visible:false,
          timer:null
      }
  },
  mounted() {
      if(this.api){
        this.filterAsync();
      }else{
          this.result=[...this.list];
      }
  },
  methods: {
      filter(){
       this.result=   this.list.filter(it=>{
              return it[this.searchBy].includes(this.keyword);
          })
      },
      reset(){
          this.keyword='';
          this.select(null);
      },
      hideResult(){
          setTimeout(()=>{
              this.visible=false;
          },1)
      },
      select(it){
          this.keyword=it && it[this.displayBy];
          this.onSelect && this.onSelect(it);
      },
      filterAsync(){
         let params={};
         if(this.keyword){
             params={
                 query:`where("${this.searchBy}" contains "${this.keyword}")`,
                 }
         }
         api(this.api,params).then(r=>{
             this.result=r.data;
         })
      },
  debounceFilterAsync (){
if(this.timer)
clearTimeout(this.timer);
this.timer=setTimeout(()=>{
    this.filterAsync();
},300)
  },
  },
  watch: {
      keyword(n,o){
          if(this.api){
              this.debounceFilterAsync();
          }else{
              this.filter();
          }
      }
  },
}
</script>

<style scoped>
.dropdown {
    display: block;
    position: relative;
  }

  .dropdown input {
    width: 100%;
  }

  .list {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .2);
  }

  .option {
    padding: .2rem .5rem;
  }

  .option:hover {
    background: rgba(0, 40, 180, .2);
  }

  .list {
    position: absolute;
    z-index: 100;
    width: 100%;
  }
</style>
