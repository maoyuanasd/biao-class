<template>
  <div>
    <RegularNav/>
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col class="text" :span="14">
          <h1 class="title">烤面筋串儿时辣条味小零食90后怀旧辣片</h1>
          <div class="well">
            <dl class="pair">
              <dt>价格</dt>
              <dd class="hot cny">19.9</dd>
            </dl>
            <dl class="pair">
              <dt>运费</dt>
              <dd class="cny">10.0</dd>
            </dl>
          </div>
          <el-row>
            <el-col :span="8">月销量
              <span class="hot">9999</span>
            </el-col>
            <el-col :span="8">累计评价
              <span class="hot">9999</span>
            </el-col>
            <el-col :span="8">累计评价
              <span class="hot">9999</span>
            </el-col>
          </el-row>
          <dl class="pair">
            <dt>口味</dt>
            <dd>
              <div class="pill-option">辣</div>
              <div class="pill-option selected">甜</div>
              <div class="pill-option">麻</div>
            </dd>
          </dl>
          <dl class="pair">
            <dt>数量</dt>
            <dd>
              <el-input-number size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
            </dd>
          </dl>
          <div class="text-center">
            <el-button size="small" type="danger">立即购买</el-button>
            <el-button size="small" type="primary">加入购物车</el-button>
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
          yo
          <img src="http://dummyimage.com/1000x2000">
          yo
          <img src="http://placekitten.com/500/1000">
      </div>
    </div>
  </div>
</template>

<script>
import RegularNav from "../component/RegularNav.vue";
export default {
  components: { RegularNav }
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
