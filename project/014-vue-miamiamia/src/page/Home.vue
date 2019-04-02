<template>
  <div>
    <RegularNav/>
    <div class="container carousel">
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="it in list_carousel" :key="it.id">
          <router-link :to="`/product/${it.id}`">
          <img
            :src="it.carousel ?  fileUrl(it.carousel) : 'https://mock-cdn.biaoyansu.com/MOCK-FILE-5c81fe7b024292.83724495.jpeg'"
          >
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div >
    <div class="container">
      <h2>新品</h2>
      <el-row :gutter="5" class="vertical-gutter">
        <el-col :span="6" v-for="it in list_new">
          <ProductCard :data="it"/>
        </el-col>
      </el-row>
      <h2>促销</h2>
      <el-row :gutter="5" class="vertical-gutter">
        <el-row :gutter="5" class="vertical-gutter">
          <el-col :span="6" v-for="it in  list_hot">
            <ProductCard :data="it"/>
          </el-col>
        </el-row>
      </el-row>
    </div>
    </div>
  </div>
</template>
<script>
import RegularNav from '../component/RegularNav'
import api from '../lib/api.js'
import ProductCard from '../component/ProductCard'
import { fileUrl } from '../lib/helper.js'
export default {
  components: { RegularNav, ProductCard },
  data() {
    return {
      list_new: [],
      list_hot: [],
      list_carousel: [],
      fileUrl
    }
  },
  mounted() {
    this.read('new');
    this.read('hot');
    this.read('carousel');
  },
  methods: {
    read(type) {
      let param = {
        where: {
          and: {
            ['is_' + type]: true
          }
        }
      }
      api('product/read', param).then(r => {
        this['list_' + type] = r.data;
      })
    }
  },
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
