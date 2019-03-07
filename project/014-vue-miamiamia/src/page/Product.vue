<template>
  <div>
    <RegularNav/>
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="it in row.main_img" :key="it.id">
              <img :src="fileUrl(it)" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col class="text" :span="14">
          <h1 class="title">{{row.title}}</h1>
          <div class="well">
            <dl class="pair">
              <dt>价格</dt>
              <dd class="hot cny">{{row.price}}</dd>
            </dl>
            <dl class="pair">
              <dt>运费</dt>
              <dd class="cny">{{row.shipping_fee}}</dd>
            </dl>
          </div>
          <el-row>
            <el-col :span="8">月销量
              <span class="hot">9999</span>
            </el-col>
            <el-col :span="8">累计评价
              <span class="hot">9999</span>
            </el-col>
            <el-col :span="8">库存
              <span class="hot">{{row.total}}</span>
            </el-col>
          </el-row>
          <dl class="pair" v-for="(option,key) in row.prop">
            <dt>{{key}}</dt>
            <dd>
              <div @click="setProp(key,it)" :class="'pill-option '+(it==form.prop[key]? 'selected':'')" v-for="it in option">{{it}}</div>
            </dd>
          </dl>
          <dl class="pair">
            <dt>数量</dt>
            <dd>
              <el-input-number v-model="form.count" size="mini" :min="1" :max="999" label="描述文字"></el-input-number>
            </dd>
          </dl>
          <div class="text-center">
            <el-button :disabled="!allPropsChecked()" @click="createOrder" size="small" type="danger">立即购买</el-button>
            <el-button :disabled="!allPropsChecked()" size="small" type="primary">加入购物车</el-button>
          </div>
          <dl class="pair">
            <dt>服务承诺</dt>
            <dd>
              <a class="anchor" href="#">破损包退</a>
              <a class="anchor" href="#">正品保证</a>
              <a class="anchor" href="#">极速退款</a>
              <a class="anchor" href="#">七天无理由退换</a>
              <a class="anchor" href="#">支付方式</a>
            </dd>
          </dl>
        </el-col>
      </el-row>
    </div>
    <div class="container detail">
      <div class="props">
        <el-row>
          <el-col class="pair" :span="8">
            <div>生产许可证编号</div>
            <div>SC12543062605639</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>产品标准号</div>
            <div>Q/YPXY 0002S</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>厂名</div>
            <div>平江县新翔宇食品有限公司</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>产品标准号</div>
            <div>Q/YPXY 0002S</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>生产许可证编号</div>
            <div>SC12543062605639</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>产品标准号</div>
            <div>Q/YPXY 0002S</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>厂名</div>
            <div>平江县新翔宇食品有限公司</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>产品标准号</div>
            <div>Q/YPXY 0002S</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>生产许可证编号</div>
            <div>SC12543062605639</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>产品标准号</div>
            <div>Q/YPXY 0002S</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>厂名</div>
            <div>平江县新翔宇食品有限公司</div>
          </el-col>
          <el-col class="pair" :span="8">
            <div>产品标准号</div>
            <div>Q/YPXY 0002S</div>
          </el-col>
        </el-row>
        </div>
        <div class="content">
        <div v-for="it in row.detail">
          <div v-if="it.type=='text'">{{it.value}}</div>
          <div v-else>
            <img :src="fileUrl(it.value)" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegularNav from "../component/RegularNav.vue";
import api from '../lib/api.js'
import {fileUrl,orderSum} from '../lib/helper.js';
import session from '../lib/session.js';
export default {
  components: { RegularNav },
  data() {
    return {
      row:{},
      form:{
        count:1,
        prop:{},
      },
      fileUrl
    }
  },
  mounted() {
    this.find();
  },
  methods: {
    find(){
     api('product/find',{id:this.$route.params.id}).then(r=>{
       this.row=r.data;
       this.normalize ();
     })
    },
    normalize (){
      let p=this.row.prop;
      let arr=[];
      for(let key in p){
       arr=p[key].split('|');
       p[key]=arr;
      }
    },
    createOrder(){
      let p=this.row;
      let f=this.form;
      f.product_id=p.id;
      f.product_snapshot=p;
      let order={detail:[f]};
      order.user_id=session.user().id;
      order.sum=orderSum(order.detail);
      api('order/create',order).then(r=>{
        this.$router.push(`/my/order/${r.data.id}`)
      })

    },
    setProp(key,value){
      let p=this.form.prop;
      this.$set(p,key,value);
    },
    allPropsChecked(){
      let valid=true;
     for(let key in this.row.prop){
       if(!this.form.prop[key]){
         valid=false;
       }
     }
      return valid;
    }
  },
};
</script>

<style scoped>
.pair > *:nth-child(odd) {
  font-size: 80%;
  margin-right: 3em;
}

.overview .hot.cny {
  font-size: 120%;
}

.title {
  font-size: 1.1rem;
}

.detail > *,
.text > * {
  margin-bottom: 0.8em;
}

.pill-option {
  display: inline-block;
  margin-right: 0.5em;
  padding: 0.3em 0.5em;
  border: 2px solid rgba(0, 0, 0, 0.2);
  font-size: 80%;
  cursor: default;
}

.pill-option.selected {
  border-color: #e10;
}

.props {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1em;
  font-size: 80%;
  color: #666;
}

.props .el-col {
  margin-bottom: 0.3em;
}

.props .pair > * {
  margin-right: 0;
  margin-left: 0;
}

.props .pair > *:nth-child(odd) {
  width: 40%;
}
.props .pair > *:nth-child(even) {
  width: 60%;
}
</style>
