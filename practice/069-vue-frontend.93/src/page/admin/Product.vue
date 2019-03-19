<template>
  <div>
    <h1>商品管理</h1>
    <div>
      <el-button-group>
        <el-button size="mini" @click="ui.formVisible=!ui.formVisible">
          <span v-if="ui.formVisible">取消</span>
          <span v-else>创建</span>
        </el-button>
      </el-button-group>
    </div>
    <div>
      <h2>添加/修改</h2>
      <form @submit.prevent="createOrUpdate();resetDropdown()" v-if="ui.formVisible">
        <label>
          <span class="title">标题</span>
          <input
            type="text"
            class="el-input__inner"
            @keyup="debounceValidate('title')"
            v-model="form.title"
          >
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.title"
            >{{rules.title[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">分类</span>
          <Dropdown
            :className="'el-input__inner'"
            api="cat/read"
            displayBy="name"
            searchBy="name"
            :onSelect="makeSelect('cat_id')"
            ref="mychild"
          />
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.cat_id"
            >{{rules.cat_id[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">品牌</span>
          <Dropdown
            :className="'el-input__inner'"
            api="brand/read"
            displayBy="name"
            searchBy="name"
            ref="mychild1"
            :onSelect="makeSelect('brand_id')"
          />
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.brand_id"
            >{{rules.brand_id[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">价格</span>
          <input
            type="text"
            class="el-input__inner"
            @keyup="debounceValidate('price')"
            v-model="form.price"
          >
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.price"
            >{{rules.price[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">运费</span>
          <input
            type="number"
            class="el-input__inner"
            @keyup="debounceValidate('shipping_fee')"
            v-model="form.shipping_fee"
          >
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.shipping_fee"
            >{{rules.shipping_fee[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">库存</span>
          <input
            type="number"
            class="el-input__inner"
            @keyup="debounceValidate('total')"
            v-model="form.total"
          >
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.total"
            >{{rules.total[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">销量</span>
          <input
            type="number"
            class="el-input__inner"
            @keyup="debounceValidate('sales')"
            v-model="form.sales"
          >
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.sales"
            >{{rules.sales[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">折扣</span>
          <input
            type="number" step="0.01"
            class="el-input__inner"
            @keyup="debounceValidate('discount')"
            v-model="form.discount"
          >
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.discount"
            >{{rules.discount[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">热卖</span>
          <el-switch v-model="form.is_hot" active-color="#13ce66" inactive-color="#aaa"></el-switch>
        </label>
        <label>
          <span class="title">货到付款</span>
          <el-switch v-model="form.cod" active-color="#13ce66" inactive-color="#aaa"></el-switch>
        </label>
        <label>
          <span class="title">新品</span>
          <el-switch v-model="form.is_new" active-color="#13ce66" inactive-color="#aaa"></el-switch>
        </label>
        <label>
          <span class="title">首页轮播</span>
          <el-switch v-model="form.is_carousel" active-color="#13ce66" inactive-color="#aaa"></el-switch>
          <div v-if="form.is_carousel">
            <label>
              <span class="title">轮播图片</span>
              <Uploader @upload="carouselUploaded"/>
            </label>
            <img class="thumbnail" v-if="form.carousel" :src="fileUrl(form.carousel)">
          </div>
        </label>
        <label>
          <div class="row">
            <span class="title">独有属性</span>
            <input type="text" v-model="propForm.key" placeholder="名称">
            <input type="text" v-model="propForm.value" placeholder="可选的值,请用|隔开">
            <button type="button" @click="addProp">完成</button>
          </div>
          <div class="row">
            <div v-for="(value,key) in form.prop">
              <span>{{key}}</span>:
              <span>{{value}}</span>
              <button type="button" @click="removeProp(key)">删除</button>
              <button type="button" @click="fillProp(key)">编辑</button>
            </div>
          </div>
        </label>
        <div>
          <label>
            <div class="title">主图</div>
            <Uploader @upload="singleCoverUploaded"/>
          </label>
          <el-row>
            <el-col class="thumbnail" v-for="(it,i) in form.main_img" :span="6">
              <div>{{it._original_name}}</div>
              <img :src="fileUrl(it)" alt="it._original_name">
              <button type="button" @click="removeItem('main_img',i)">删除</button>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="title">详细描述</div>
          <button @click="inertDesc('text')" type="button">添加文字</button>
          <button @click="inertDesc('img')" type="button">添加图片</button>
          <div class="segment" v-for="(it,i) in form.detail">
            <div v-if="it.type=='text'">
              <el-input type="textarea" v-model="it.value"/>
            </div>
            <div v-else>
              <Uploader @upload="singleDescUploaded($event,i)"/>
              <div v-if="it.value">
                <img :src="fileUrl(it.value)" alt="it.vaule._original_name">
              </div>
            </div>
            <button type="button" @click="removeItem('detail',i)">删除</button>
          </div>
        </div>
        <div>
          <button type="submit" class="el-button el-button--primary">提交</button>
          <button class="el-button el-button--text" @click="ui.formVisible=false">取消</button>
        </div>
      </form>
    </div>
    <div>
      <h2>列表</h2>
      <p>总共:{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="title" label="商品名" width="180"></el-table-column>
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="prop" label="主图" width="200">
          <template slot-scope="scope">
            <el-col class="thumbnail" v-for="it in scope.row.main_img" :span="12">
              <img :src="fileUrl(it)" alt="it._original_name">
            </el-col>
          </template>
        </el-table-column>
        <el-table-column prop="$cat.name" label="分类" width="180"></el-table-column>
        <el-table-column prop="$brand.name" label="品牌" width="180"></el-table-column>
        <el-table-column prop="price" label="价格" width="180"></el-table-column>
        <el-table-column prop="shipping_fee" label="运费" width="180"></el-table-column>
        <el-table-column prop="total" label="库存" width="180"></el-table-column>
        <el-table-column prop="prop" label="独有属性" width="180">
          <template slot-scope="scope">
            <div v-for="(value,key) in scope.row.prop">
              <span>{{key}}</span>:
              <span>{{value}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center">
        <el-pagination
          layout="prev, pager, next"
          @current-change="flip"
          :current-page="readParam.page"
          :total="total"
          :page-size="readParam.limit"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import admin from "../../mixin/admin.js";
import Dropdown from "../../component/Dropdown";
import Uploader from "../../component/Uploader";
export default {
  components: { Dropdown, Uploader },
  mixins: [admin],
  data() {
    return {
      propForm: { key: "", value: "" },
      model: "product",
      rules: {
        title: {
          required: {
            msg: "标题为必填项"
          }
        },
        cat_id: {
          required: {
            msg: "分类为必填项"
          }
        },
        brand_id: {
          required: {
            msg: "品牌为必填项"
          }
        },
        price: {
          min: {
            params: [0],
            msg: "价格不可小于0"
          }
        },
        shipping_fee: {
          min: {
            params: [0],
            msg: "运费不可小于0"
          }
        },
        total: {
          min: {
            params: [0],
            msg: "库存不可小于0"
          }
        }
      },
      readParam: {
        with: ["belongs_to:cat", "belongs_to:brand"]
      }
    };
  },
  mounted() { },
  methods: {
    resetDropdown() {
      this.$refs.mychild.reset();
      this.$refs.mychild1.reset();
    },
    addProp() {
      let f = this.form;
      let pf = this.propForm;
      let key = pf.key;
      let value = pf.value;
      if (!key || !value) return;
      if (!f.prop) this.$set(f, "prop", {});
      this.$set(f.prop, key, value);
      this.propForm = {};
    },
    removeProp(key) {
      this.$delete(this.form.prop, key);
    },
    fillProp(k) {
      this.$set(this.propForm, "key", k);
      this.$set(this.propForm, "value", this.form.prop[k]);
    },
    singleCoverUploaded(data) {
      let f = this.form;
      if (!f.main_img) this.$set(f, "main_img", []);
      f.main_img.push(data);
    },
    inertDesc(type) {
      let f = this.form;
      if (!f.detail) this.$set(f, "detail", []);
      f.detail.push({ type });
    },
    singleDescUploaded(data, i) {
      let f = this.form;
      this.$set(f.detail[i], "value", data);
      console.log(f.detail[i].value);
    },
    carouselUploaded(data) {
      this.$set(this.form, 'carousel', data);
    },
    removeItem(key, i) {
      if (!confirm("确认删除")) return;
      this.form[key].splice(i, 1);
    }
  }
};
</script>
<style scoped>
.thumbnail {
  padding: 0.3em;
}
.segment {
  padding: 0.5em;
  border: 2px solid #ccc;
  margin-bottom: 0.5em;
}
</style>
