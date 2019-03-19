<template>
  <div class="scroll-load">
    <span v-if="noMore">到头了</span>
    <button v-else class="main" @click="next()">{{mainText}}</button>
  </div>
</template>

<script>
export default {
  props: ["page",'totalPage','pending'],
  data() {
    return {
      current: 1,
      docHeight: 0,
      mainText: "加载更多",
      noMore: false
    };
  },
  mounted() {
    this.bindScroll();
    this.current = this.page || 1;
  },
  methods: {
    bindScroll() {
      window.addEventListener("scroll", e => {
          
          if(this.current>this.totalPage){
              this.noMore=true;
              return;
          }
        if (this.calcRemain() < 10) {
          let wait;
          if(this.pending==undefined)
          wait=this.docHeight == this.getDocumentHeight();
          else
          wait=this.pending
          if (wait) {
            this.mainText = "加载中";
            return;
          }
          this.next();
          this.mainText = "加载更多";
        }
        console.log(this.current,this.totalPage)
      });
    },
    getDocumentHeight() {
      return document.documentElement.scrollHeight;
    },
    calcRemain() {
      let html = document.documentElement;
      let htmlHeight = html.scrollHeight;
      let windowHeight = window.innerHeight;
      let scrollTop = html.scrollTop;
      let resule = htmlHeight - windowHeight - scrollTop;
      return resule;
    },
    next() {
      this.docHeight = this.getDocumentHeight();
      this.$emit("flip", ++this.current);
    }
  }
};
</script>

<style scoped>
.scroll-load {
  text-align: center;
}

.main {
  width: 100%;
}
</style>
