<template>
  <div>
    <h1>分类管理</h1>
    <div>
      <el-button-group>
        <el-button size="mini" @click="ui.formVisible=!ui.formVisible">
          <span v-if="ui.formVisible">取消</span>
          <span v-else>创建</span>
        </el-button>
        <!-- <el-button size="mini">批量操作</el-button> -->
      </el-button-group>
    </div>
    <div>
      <h2>添加/修改</h2>
      <form @submit.prevent="createOrUpdate" v-if="ui.formVisible">
        <label>
          <span class="title">分类名</span>
          <input
            type="text"
            class="el-input__inner"
            @keyup="debounceValidate('name')"
            v-model="form.name"
          >
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.name"
            >{{rules.name[e].msg}}</span>
          </span>
        </label>
        <label>
          <span class="title">父级分类</span>
          <Dropdown
            class="el-input__inner"
            api="cat/read"
            displayBy="name"
            searchBy="name"
            :onSelect="makeSelect('parent_id')"
          />
        </label>
        <label>
          <button type="submit" class="el-button el-button--primary">提交</button>
          <button class="el-button el-button--text" @click="ui.formVisible=false">取消</button>
        </label>
      </form>
    </div>
    <div>
      <h2>列表</h2>
      <p>总共:{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="name" label="品牌名" width="180"></el-table-column>
        <el-table-column prop="$parent.name" label="父级分类" width="180"></el-table-column>

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
import admin from '../../mixin/admin.js'
import Dropdown from '../../component/Dropdown'
export default {
  components: { Dropdown },
  mixins: [admin],
  data() {
    return {
      model: 'cat',
      rules: {
        name: {


          required: {
            msg: "此项为必填项"
          },
          unique: {
            params: ["cat", "exists", "name"],
            msg: "品牌名已存在"
          }
        }
      },
      readParam: {
        with: {
          model: 'cat',
          relation: 'belongs_to',
          foreign_key: 'parent_id',
          as: 'parent'
        }
      }
    };
  },
  methods: {

  },

};
</script>
