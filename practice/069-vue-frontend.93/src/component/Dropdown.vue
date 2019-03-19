<template>
  <div>
    <div class="dropdown">
      <div class="filter">
        <input :class="className"
          type="search"
          v-model="keyword"
          @focus="visible=true;reset()"
          @blur="hideResult(); $emit('blur')"
          @submit="reset()"
        >
      </div>
      <div class="list" v-if="visible">
        <div v-for="it in result" @mousedown="select(it)" class="option">{{it[displayBy]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api.js";
export default {
  props: ["list", "onSelect", "displayBy", "api", "searchBy","className"],
  data() {
    return {
      keyword: "",
      result: [],
      visible: false,
      timer: null
    };
  },
  mounted() {
    if (this.api) {
      this.filterAsync();
    } else {
      this.result = [...this.list];
    }
  },
  methods: {
    hideResult() {
      setTimeout(() => {
        this.visible = false;
      }, 1);
    },
    reset() {
      this.keyword = "";
      this.select(null);
    },
    filterAsync() {
      let params = {};
      if (this.keyword) {
        params = {
          query: `where("${this.searchBy}" contains "${this.keyword}")`
        };
      }
      api(this.api, params).then(r => {
        this.result = r.data;
      });
    },
    filter() {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(this.keyword);
      });
    },
    select(it) {
      this.keyword = it && it[this.displayBy];
      if (!it || !this.onSelect) return;
      this.onSelect(it);
    },
    debounceFilterAsync() {
      if (this.timer) clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.filterAsync();
      }, 300);
    }
  },
  watch: {
    
    keyword(n, o) {
      if (this.api) {
        this.debounceFilterAsync();
      } else {
        this.filter();
      }
    }
  }
};
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
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.option {
  padding: 0.2rem 0.5rem;
}

.option:hover {
  background: rgba(0, 40, 180, 0.2);
}

.list {
  position: absolute;
  z-index: 100;
  width: 100%;
}
</style>
