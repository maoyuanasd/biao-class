<template>
  <div>
    <h1>品牌管理</h1>
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
          <span class="title">品牌名</span>
          <input class="el-input__inner" type="text" v-model="form.name" @keyup="debounceValidate('name')">
           <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.name"
          >{{rules.name[e].msg}}</span>
           </span>
        </label>
        
        <label>
          <button class="el-button el-button--primary" type="submit">提交</button>
          <button class="el-button el-button--text" @click="ui.formVisible=false">取消</button>
        </label>
      </form>
    </div>
    <div>
      <h2>列表</h2>
      <p>总数:{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="name" label="品牌名" width="180"></el-table-column>
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
import admin from '../../mixin/admin.js'
export default {
  mixins:[admin],
  data() {
    return {
      model: 'brand',
      rules: {
        name: {
          required: {
            msg: "此项为必填项"
          },
          unique: {
            params: ["brand", "exists", "name"],
            msg: "用户名已存在"
          }
        },
     
      },
    };
  },
  
};
</script>
