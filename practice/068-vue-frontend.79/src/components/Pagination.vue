<template>
  <div class="pagination">
    <div class="btn-group">
      <button class="item" @click="first" :class="(active==1)? 'active':''">首页</button>
      <button class="item" @click="prev">上一页</button>
    </div>
    <div class="btn-group">
      <button
      v-if="Math.abs(it-active)<=radius"
        class="item"
        v-for="it in totalPage"
        @click="onClick(it)"
        :class="(it==active)? 'active':''"
      >{{it}}</button>
    </div>
    <div class="btn-group">
      <button class="item" @click="next">下一页</button>
      <button class="item" @click="last" :class="(active==totalPage)? 'active':''">末页</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1
    };
  },
  props: {
    total: {},
    limit: {},
    onChange:{},
     radius: {
        default: 3
      },
  },
  methods: {
    onClick(page) {
       this.change(page)
        },
    change(page){
        if(page<1 || page > this.totalPage)
        return;
        this.active=page;
        this.onChange && this.onChange(page)
    },
    prev(){
      this.change(this.active-1);
    },
    next(){
        this.change(this.active+1);
    },
    first(){
        this.change(1);
    },
    last(){
        this.change(this.totalPage);
    }
  },
  computed: {
    totalPage() {
      let p = this.$props;
      return Math.ceil(p.total / p.limit);
    }
  }
};
</script>
<style scoped>
.pagination {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.pagination > * {
  display: inline-block;
  margin-right: 0.5rem;
}

.item.active {
  background: #000;
  color: #fff;
  border-color: #000;
}

.item {
  padding: 0.2rem 0.4rem;
}
</style>
