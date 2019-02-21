<template>
  <div class="scroll-load">
    <span v-if="noMore">到头了</span>
    <button v-else class="main" @click="next()">{{mainText}}</button>
  </div>
</template>

<script>
export default {
  props: ["page", "totalPage",'pending'],
  data() {
    return {
      current: 1,
      docHeight: 0,
      mainText: "加载更多",
      noMore: false
    };
  },
  mounted() {
    this.current = this.page || 1;
    this.bindScroll();
  },
  methods: {
    bindScroll() {
      window.addEventListener("scroll", e => {
        if (this.current > this.totalPage) {
          this.noMore = true;
          return;
        }
        let wait;
        if (this.calcRemain() < 10) {
          if(this.pending===undefined)
          wait=this.getDocHeight() == this.docHeight;
          else
          wait=this.pending;

          if (wait) {
            this.mainText = "加载中";
            return;
          }
          this.mainText = "加载更多";
          this.next();
        }
      console.log(this.current,this.totalPage)
      });
    },
    updateDocHeight() {
      this.docHeight = this.getDocHeight();
    },
    calcRemain() {
      let html = document.documentElement;
      let htmlHeight = html.scrollHeight;
      let windowHeight = window.innerHeight;
      let scrollTop = html.scrollTop;
      let result = htmlHeight - windowHeight - scrollTop;
      return result;
    },
    getDocHeight() {
      return document.documentElement.scrollHeight;
    },
    next() {
      this.updateDocHeight();
      this.$emit("flip", ++this.current);
    }
  }
};
</script>

<style>
.scroll-load {
  text-align: center;
}

.main {
  width: 100%;
}
</style>
