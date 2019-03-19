<template>
  <div class="panel">
    <h1>帖子管理</h1>
    <div class="toolbar">
      <button @click="ui.showForm=!ui.showForm">创建</button>
    </div>
    <form v-if="ui.showForm" @submit.prevent="createOrUpdate">
      <div class="input-control">
        <label>
          <span class="name">分类名</span>
          <input type="text" v-model="form.name" @keyup="debounceValidate('name')">
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.name"
            >{{rules.name[e].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <button type="submit">提交</button>
        </label>
      </div>
    </form>
    <table>
      <thead>
        <th>分类名</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list">
          <td>{{it.name || '-'}}</td>
          <td>
            <div class="btn-group">
              <button @click="fill(it)">更新</button>
              <button @click="remove(it.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :total="total" :limit="readParams.limit" :onChange="filp"/>
  </div>
</template>

<script>
import adminMixin from "../../mixin/admin.js";
export default {
  mixins:[adminMixin],
  data() {
    return {
      model: 'cat',
      rules: {
        name: {
          lengthBetween: {
            params: [1, 10],
            msg: "最小长度需在4至64位之间"
          },
          required: {
            msg: "此项为必填项"
          },
        },
      }
    };
  }
};
</script>

<style></style>
