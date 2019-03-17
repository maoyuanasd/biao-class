<template>
  <div>
    <RegularNav/>
    <div class="container carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="it in list_carousel" :key="it.carousel.id">
          <router-link :to="`product/${it.id}`">
          <img :src="fileUrl(it.carousel)" alt="">
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <h2>新品</h2>
      <el-row :gutter="5" class="vertical-gutter">
        <el-col v-for="it in list_new" :span="6">
          <productCard :data="it"/>
        </el-col>
      </el-row>
      <h2>促销</h2>
      <el-row :gutter="5" class="vertical-gutter">
        <el-col v-for="it in list_hot" :span="6">
          <productCard :data="it"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import RegularNav from "../component/RegularNav";
import api from "../lib/api.js";
import { fileUrl } from "../lib/helper.js";
import productCard from "../component/ProductCard";
export default {
  components: { RegularNav, productCard },
  data() {
    return {
      list_new: [],
      list_hot: [],
      list_carousel: [],
      fileUrl
    };
  },
  mounted() {
    this.read("new");
    this.read("hot");
    this.read('carousel');
  },
  methods: {
    read(type) {
      let param = {
        where: {
          and: {
            ["is_" + type]: true
          }
        }
      };

      api("product/read", param).then(r => {
        this["list_" + type] = r.data || [];
      });
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
