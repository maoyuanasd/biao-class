<template>
  <div>
    <h1>商品管理</h1>
    <div>
      <el-button @click="ui.formVisible = !ui.formVisible">
        <span v-if="ui.formVisible">取消</span>
        <span v-else>创建</span>
      </el-button>
    </div>
    <div>
      <h2>添加/修改</h2>
      <form @submit.prevent="createOrUpdate" v-if="ui.formVisible">
        <label>
          <span class="title">标题</span>
          <input
            class="el-input__inner"
            type="text"
            v-model="form.title"
            @keyup="debounceValidate('title')"
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
            class="el-input__inner"
            type="number"
            v-model="form.price"
            @keyup="debounceValidate('price')"
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
            class="el-input__inner"
            type="number"
            v-model="form.shipping_fee"
            @keyup="debounceValidate('shipping_fee')"
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
            class="el-input__inner"
            type="number"
            v-model="form.total"
            @keyup="debounceValidate('total')"
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
             <span class="title">独有属性</span>
          <div class="row">
            <input type="text" v-model="propForm.key">
            <input type="text" v-model="propForm.value" placeholder="请用|分割">
            <button type="button" @click="addProp">添加</button>
          </div>
          <div class="row">
             
            <div v-for="(value,key) in form.prop">
              <span>{{key}}</span>:
              <span>{{value}}</span>
              <button type="button" @click="removeProp(key)">删除</button>
              <button type="button" @click="fillProp(key,value)">编辑</button>
            </div>
          </div>
        </label>
        <label>
          <span class="title">新品</span>
          <el-switch v-model="form.is_new" active-color="#13ce66" inactive-color="#999"></el-switch>
        </label>
        <label>
          <span class="title">热卖</span>
          <el-switch v-model="form.is_hot" active-color="#13ce66" inactive-color="#999"></el-switch>
        </label>
        <div>
          <span class="title">首页轮播</span>
          <el-switch v-model="form.is_carousel" active-color="#13ce66" inactive-color="#999"></el-switch>
          <label v-if="form.is_carousel">
            <span class="title">轮播图片</span>
            <Uploader @upload="carouselUploaded"/>
            <img class="thumbnail" v-if="form.carousel" :src="fileUrl(form.carousel)" alt="">
          </label>
        </div>
        <div>
          <label>
            <span class="title">主图</span>
            <Uploader @upload="singleCoverUploaded"/>
          </label>
          <el-row>
            <el-col class="thumbnail" v-for="(it,i) in form.main_img" :span="6">
              <span class="title">{{it._original_name}}</span>
              <img :src="fileUrl(it)" :alt="it._original_name">
              <button type="button" @click="removeItem('main_img',i)">删除</button>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="title">详细描述</div>
          <button type="button" @click="inertDesc('text')">插入文字</button>
          <button type="button" @click="inertDesc('img')">插入图片</button>
          <div>
            <div class="segment" v-for="(it,i) in form.detail">
              <button type="button" @click="removeItem('detail',i)">删除</button>
              <div v-if="it.type=='text'">
                <el-input type="textarea" v-model="it.value"/>
              </div>
              <div v-else>
                <Uploader @upload="singleDescImgUploaded($event,i)"/>
                <div v-if="it.value">
                  <img :src="fileUrl(it.value)" :alt="it.value._original_name">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="el-button el-button--primary" type="submit">提交</button>
          <button class="el-button el-button--text" @click="ui.formVisible=false">取消</button>
        </div>
      </form>
    </div>
    <div>
      <h2>列表</h2>
      <p>总数:{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column label="独有属性" width="180">
          <template slot-scope="scope">
            <div v-for="(value,key) in scope.row.prop">
              <span>{{key}}</span>:
              <span>{{value}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="主图" width="200">
          <template slot-scope="scope">
            <el-col class="thumbnail" v-for="(it,i) in scope.row.main_img" :span="12">
              <img :src="fileUrl(it)">
            </el-col>
          </template>
        </el-table-column>
        <el-table-column prop="$cat.name" label="分类" width="180"></el-table-column>
        <el-table-column prop="$brand.name" label="品牌" width="180"></el-table-column>
        <el-table-column prop="price" label="价格" width="180"></el-table-column>
        <el-table-column prop="shipping_fee" label="运费" width="180"></el-table-column>
        <el-table-column prop="total" label="库存" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center">
        <el-pagination
          layout="prev, pager, next,jumper,total"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="flip"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import admin from "../../mixin/admin.js";
import Dropdown from "../../component/Dropdown";
import Uploader from '../../component/Uploader'
export default {
  components: { Dropdown, Uploader },
  mixins: [admin],
  data() {
    return {
      model: "product",
      propForm: {},
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
        with: [
          "belongs_to:cat", "belongs_to:brand"
        ]
      }
    };
  },
  methods: {
    addProp() {
      let f = this.form;
      let pf = this.propForm;
      let key = pf.key;
      let value = pf.value;
      if (!value || !key)
        return;
      if (!f.prop)
        this.$set(f, 'prop', {});
      f.prop[key] = value;
      this.propForm = {};
    },
    removeProp(key) {
      if (!confirm('确认删除'))
        return;
      this.$delete(this.form.prop, key);
    },
    fillProp(key, value) {
      this.$set(this.propForm, 'key', key);
      this.$set(this.propForm, 'value', value);
    },
    singleCoverUploaded(data) {
      let f = this.form;
      if (!f.main_img)
        this.$set(f, 'main_img', []);
      f.main_img.push(data);
    },
    removeItem(key, i) {
      this.form[key].splice(i, 1);
    },
    inertDesc(type) {
      if (!this.form.detail)
        this.$set(this.form, 'detail', []);
      this.form.detail.push({ type });
    },
    updateDesc(index, value) {
      this.$set(this.form.detail[index], 'value', value)
    },
    singleDescImgUploaded(image, index) {
      this.updateDesc(index, image);
      console.log(this.form)
    },
    carouselUploaded(data){
      this.$set(this.form,'carousel',data);
    }
  }
};
</script>
<style scoped>
.thumbnail {
  padding: 0.3rem;
}
.segment {
  padding: 0.5em;
  border: 2px solid #ccc;
  margin-bottom: 0.5em;
}
</style>


