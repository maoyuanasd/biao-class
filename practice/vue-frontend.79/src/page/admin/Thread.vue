<template>
  <div class="panel">
    <h1>帖子管理</h1>
    <div class="toolbar">
      <button @click="ui.showForm=!ui.showForm">创建</button>
    </div>
    <form v-if="ui.showForm" @submit.prevent="createOrUpdate">
      <div class="input-control">
        <label>
          <span class="title">标题</span>
          <input type="text" v-model="form.title" @keyup="debounceValidate('title')">
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.title"
            >{{rules.title[e].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span>分类</span>
          <Dropdown
            @blur="validate('cat_id')"
            api="cat/read"
            displayBy="name"
            :onSelect="onCatSelect"
            searchBy="name"
          />
           <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.cat_id"
            >{{rules.cat_id[e].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">内容</span>
          <textarea v-model="form.content"></textarea>
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
        <th>标题</th>
        <th>内容</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list">
          <td>{{it.title || '-'}}</td>
          <td>{{it.content || '-'}}</td>
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
import Dropdown from "../../components/Dropdown";
import dateFormmatter from "../../lib/dateFormmatter.js";
import session from "../../lib/session.js";
export default {
  components: { Dropdown },
  mixins: [adminMixin],
  data() {
    return {
      model: "thread",
      rules: {
        title: {
          lengthBetween: {
            params: [4, 64],
            msg: "最小长度需在4至64位之间"
          },
          required: {
            msg: "此项为必填项"
          }
        },
        cat_id: {
          required: {
            msg: "此项为必填项"
          }
        }
      }
    };
  },
  methods: {
    onCatSelect(it) {
      this.form.cat_id = it? it.id:it;
      this.validate("cat_id");
    },
    beforeCreateOrUpdate() {
      this.form.create_at = dateFormmatter.format(new Date());
      this.form.user_id=session.user().id;
    },
  }
};
</script>

<style></style>
