<template>
  <div>
     <div class="container">
      <el-row :gutter="10">
        <el-col :span="6">
          <router-link to="/">
            <div class="logo">
              <img src="../img/logo@2x.png" alt="Logo">
            </div>
          </router-link>
        </el-col>
        <el-col class="text-right" :span="12">
          <form @submit.prevent="reload" class="search">
            <el-input v-model="q.keyword" suffix-icon="el-icon-search"></el-input>
          </form>
        </el-col>
        <el-col :span="6">
          <div class="logo">

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <div class="filter">
        <div class="table">
          <div v-for="(v,k) in filterList">

          <FilterProp
            :initial="filterRestore[k]"
            @clear="removePropFilter(k)"
            @change="setPropFilter($event,k)"
            :data="v"
            :filterName="filters[k]"
          />
          </div>
          <!-- <el-row>
            <el-col :span="3" class="type">分类</el-col>
            <el-col :span="21">
              <div class="option">糕点/点心</div>
              <div class="option">膨化食品</div>
              <div class="option">肉类即食</div>
              <div class="option">饼干</div>
              <div class="option">坚果炒货</div>
              <div class="option">豆干零食</div>
              <div class="option">糖果</div>
              <div class="option">海味即食</div>
            </el-col>
          </el-row>
          -->
        </div>
        <div class="bar">
          <div class="group">
            <el-button-group>
              <el-button
                :type="q.sortBy=='id' ? 'primary' : ''"
                @click="setSortBy('id')"
                size="mini"
              >新品
                <span v-if="q.sortBy == 'id'">
                  <i v-if="q.sortUp == 1" class="el-icon-caret-top"></i>
                  <i v-else class="el-icon-caret-bottom"></i>
                </span>
              </el-button>
              <el-button
                :type="q.sortBy=='price' ? 'primary' : ''"
                @click="setSortBy('price')"
                size="mini"
              >价格
                <span v-if="q.sortBy == 'price'">
                  <i v-if="q.sortUp == 1" class="el-icon-caret-top"></i>
                  <i v-else class="el-icon-caret-bottom"></i>
                </span>
              </el-button>
              <el-button
                :type="q.sortBy=='sales' ? 'primary' : ''"
                @click="setSortBy('sales')"
                size="mini"
              >销量
                <span v-if="q.sortBy == 'sales'">
                  <i v-if="q.sortUp == 1" class="el-icon-caret-top"></i>
                  <i v-else class="el-icon-caret-bottom"></i>
                </span>
              </el-button>
            </el-button-group>
          </div>
          <div class="group">
            <el-col :span="12">
              <input @keyup="reload" v-model="q.minPrice" placeholder="最低价格">
            </el-col>
            <el-col :span="12">
              <input @keyup="reload" v-model="q.maxPrice" placeholder="最高价格">
            </el-col>
          </div>
          <div class="group">
            <div>
              <input type="checkbox" :checked="q.freeShipping" @click="toggleBool('freeShipping')">包邮
              <input type="checkbox" :checked="q.hasDiscount" @click="toggleBool('hasDiscount')">折扣
              <input type="checkbox" :checked="q.cod" @click="toggleBool('cod')">货到付款
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="result">
        <el-row :gutter="5" class="card-list vertical-gutter">
          <el-col v-for="it in list" :span="6">
            <ProductCard :data="it"/>
          </el-col>
        </el-row>
        <div class="text-center">
          <el-pagination v-if="total!=0"
            layout="prev, pager, next"
            @current-change="flip"
            :current-page="parseInt(q.page)"
            :total="total"
            :page-size="parseInt(q.limit)"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegularNav from "../component/RegularNav";
import api from '../lib/api.js'
import ProductCard from '../component/ProductCard'
import FilterProp from '../component/search/FilterProp'
import { capitalize } from '../lib/helper';
export default {
  components: { RegularNav, ProductCard, FilterProp },
  data() {
    return {
      q: {
        page:1,
        limit:12,
        sortBy:'id'
      },
      list: [],
      filterList: {

      },
      filterRestore: {},
      filters: {
        brand: '分类',
        cat: '品牌',
      },
      total:0,
    }
  },
  mounted() {
    this.q = {...this.q, ...this.$route.query };
    this.search();
    this.forEachFilters((key) => {
      
     this.read(key)
      this.filterRestore[key] = this.q[key];
    })
  },
 
  methods: {
    setPropFilter(it, type) {
      this.q[type] = it.id;
      this.reload();
    },
    flip(page){
       this.q.page=page;
       this.reload();
    },
    removePropFilter(type) {
      this.q[type] && delete this.q[type];
      this.reload();
    },
   read(type) {
  api(`${type}/read`).then(r=>{

   this.$set(this.filterList, type, r.data)

 })
    },
    toggleBool(type) {
      if (this.q[type])
        delete this.q[type];
      else
        this.q[type] = '1';
      this.reload();
    },
    reload() {
      this.$router.push({ path: '/search', query: { ...this.q } })
    },
    setSortBy(type) {
      if (this.q.sortBy == type) {
        if (!this.q.sortUp)
          this.q.sortUp = '1';
        else
          delete this.q.sortUp
      }
      this.q.sortBy = type;
      this.reload();

    },

  forEachFilters(fn) {
      for (let key in this.filters) {
      fn(key)
      }
    },
    search() {
      let q = this.q;
      let keywordQuery = `"title" contains "${q.keyword}"`;
      let minPriceQuery = q.minPrice ? `and "price">=${q.minPrice}` : '';
      let maxPriceQuery = q.maxPrice ? `and "price"<=${q.maxPrice}` : '';
      let freeShippingQuery = q.freeShipping ? `and "shipping_fee" = 0` : '';
      let hasDiscountQuery = q.hasDiscount ? `and "discount" > 0` : '';
      let codQuery = q.cod ? `and "cod" = 1` : '';
      let propFilterQuery = '';
      this.forEachFilters((key) => {
        if (q[key])
          propFilterQuery += ` and "${key}_id" = "${q[key]}" `;
      })
      let query = `where(${keywordQuery}${minPriceQuery}${maxPriceQuery}${freeShippingQuery}${hasDiscountQuery}${codQuery}${propFilterQuery})`;
      let param = {
        query,
        sort_by: [(q.sortBy || 'id'), q.sortUp ? 'up' : 'down'],
        limit:q.limit,
        page:q.page
      }
      api('product/read', param).then(r => {
        this.list = r.data;
        this.total=r.total;
      })
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(n, o) {

        this.q = { ...this.q, ...n.query};
        this.search();
      }
    }
  },
  
};
</script>

<style>
.search {
  margin-top: 1em;
  margin-bottom: 1em;
}

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

.bar > * {
  display: inline-block;
  vertical-align: middle;
}

.bar .group {
  margin-right: 0.5em;
}

#price-filter {
  max-width: 14em;
}

.el-checkbox {
  margin-right: 0.5em;
}
</style>
