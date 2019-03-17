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
          <form class="search" @submit.prevent="reSearch">
            <el-input v-model="q.keyword" suffix-icon="el-icon-search"></el-input>
          </form>
        </el-col>
        <el-col :span="6">
          <div class="logo"></div>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <div class="filter">
        <div class="table" >
          <div v-for="(it,k) in propItem" v-if="it.filterList">
          <FilterProp :initId="filterRestore[k]" @change="setProp($event,k)" @clear="removeProp($event,k)" :data="it.filterList" :propName="it.name"/>
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
          </el-row> -->
        </div>
        <div class="bar">
          <div class="group">
            <el-button-group>
              <el-button @click="setSortBy('id')" :type="q.sortBy=='id'? 'primary':''" size="mini">新品
               <span v-if="q.sortBy=='id'">
                <i  v-if="q.sortByUp" class="el-icon-caret-top"></i>
                <i v-else class="el-icon-caret-bottom"></i>
                </span>
              </el-button>
              <el-button @click="setSortBy('price')" :type="q.sortBy=='price'? 'primary':''" size="mini">价格
                <span v-if="q.sortBy=='price'">
                <i  v-if="q.sortByUp" class="el-icon-caret-top"></i>
                <i v-else class="el-icon-caret-bottom"></i>
                </span>
              </el-button>
              <el-button @click="setSortBy('sales')" :type="q.sortBy=='sales'? 'primary':''" size="mini">销量
                <span v-if="q.sortBy=='sales'">
                <i  v-if="q.sortByUp" class="el-icon-caret-top"></i>
                <i v-else class="el-icon-caret-bottom"></i>
                </span>
              </el-button>
            </el-button-group>
          </div>
          <div class="group">
            <el-col :span="12">
              <el-input @input="reload" v-model="q.minPrice" size="mini" placeholder="最低价格"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input @input="reload" size="mini" v-model="q.maxPrice" placeholder="最高价格"></el-input>
            </el-col>
          </div>
          <div class="group">
            <div size="mini">
              <label>
                <input
                  @click="toggleBool('freeShipping')"
                  :checked="q.freeShipping"
                  type="checkbox"
                >
                包邮
              </label>
              <label>
                <input @click="toggleBool('hasDiscount')" :checked="q.hasDiscount" type="checkbox">
                折扣
              </label>
              <label>
                <input @click="toggleBool('cod')" :checked="q.cod" type="checkbox">
                货到付款
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="result">
        <el-row :gutter="5" class="card-list vertical-gutter">
          <el-col :span="6" v-for="it in productList">
            <ProductCard :data="it"/>
          </el-col>
        </el-row>
        <el-pagination
          v-if="total!=0"
          class="text-center"
          layout="prev, pager, next"
          :total="total"
          @current-change="flip"
          :current-page="parseInt(q.page)"
          :page-size="parseInt(q.limit)"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../lib/api.js'
import ProductCard from '../component/ProductCard'
import FilterProp from '../component/search/FilterProp'
export default {
  components: { ProductCard,FilterProp },
  data() {
    return {
      q: {
        page: 1,
        limit: 12,
      },
      productList: [],
      total: 0,
      propItem:{
        brand:{
          name:'品牌'
        },
        cat:{
          name:'分类'
        }
      },
     filterRestore:{}
    }
  },
 mounted() {
    this.q = { ...this.q, ...this.$route.query };
    this.search();
        this.forEachPropItem((key)=>{
          this.filterRestore[key]=this.q[key];
          this.read(key);
        });
  },
  
  methods: {
    forEachPropItem(fn){
      for(let key in this.propItem){
        fn(key)
      }
    },
    setProp(it,type){
      this.q[type]=it.id;
      this.q.page=1;
      this.reload();
    },
    removeProp(it,type){
      delete this.q[type];
      this.reload();
    },
    read(type){
    api(`${type}/read`).then(r=>{
      
       this.$set(this.propItem[type],'filterList',r.data)
      //  this.propItem[type].filterList=r.data;

      })
    },
    flip(page) {
      this.q.page = page;
      this.reload();
    },
    setSortBy(type) {
      if (this.q.sortBy == type){
           if(this.q.sortByUp)
           delete this.q.sortByUp;
           else
           this.q.sortByUp=1;
      }
        // delete this.q[type];
     
        this.q.sortBy = type;
      this.reload();
    },
    toggleBool(type) {
      if (this.q[type])
        delete this.q[type]
      else
        this.q[type] = 1;
      this.reload();
    },
    reload() {
      this.$router.push({ path: '/search', query: { ...this.q } })
    },
    reSearch() {
      this.$router.push({ path: '/search', query: { keyword: this.q.keyword, page: 1, limit: 12 } })
    },
    search() {
      let q = this.q;
      let keywordQuery = `"title" contains "${q.keyword}"`;
      let minPriceQuery = q.minPrice ? `and "price">= ${q.minPrice}` : '';
      let maxPriceQuery = q.maxPrice ? `and "price"<= ${q.maxPrice}` : '';
      let freeShippingQuery = q.freeShipping ? `and "shipping_fee" = 0` : '';
      let hasDiscountQuery = q.hasDiscount ? `and "discount" > 0` : '';
      let codQuery = q.cod ? `and "cod" = 1` : '';
      let propFilterQuery='';
      this.forEachPropItem((key)=>{
         if (q[key])
          propFilterQuery += ` and "${key}_id" = "${q[key]}" `;
      })
      let query = `where(
        ${keywordQuery}
        ${minPriceQuery}
        ${maxPriceQuery}
        ${freeShippingQuery}
        ${hasDiscountQuery}
        ${codQuery}
        ${propFilterQuery}
    )`;
      let param = {
        query,
        sort_by: [(q.sortBy || 'id'),q.sortByUp? 'up':'down'],
        page: q.page,
        limit: q.limit
      };
      api('product/read', param).then(r => {
        this.productList = r.data || [];
        this.total = r.total;
      })
    }
  },
  watch: {
    $route: {
      deep: true,
      handler(n, o) {
        this.q = { ...this.q, ...n.query }
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
