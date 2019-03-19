<template>
  <div class="panel">
    <h1>用户管理</h1>
    <div class="toolbar">
      <button @click="ui.showForm=!ui.showForm">创建</button>
    </div>
    <form v-if="ui.showForm" @submit.prevent="createOrUpdate">
      <div class="input-control">
        <label>
          <span class="title">昵称</span>
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
          <span class="title">用户名</span>
          <input type="text" @keyup="debounceValidate('username')" v-model="form.username">
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.username"
            >{{rules.username[e].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">签名</span>
          <input type="text" v-model="form.intro">
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">密码</span>
          <input type="password" v-model="form.password" @keyup="debounceValidate('password')">
          <span class="error-list">
            <span
              class="error"
              v-if="invalid"
              v-for="(invalid,e) in errors.password"
            >{{rules.password[e].msg}}</span>
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
        <th>昵称</th>
        <th>用户名</th>
        <th>签名</th>
        <th>密码</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list">
          <td>{{it.name || '-'}}</td>
          <td>{{it.username || '-'}}</td>
          <td>{{it.intro || '-'}}</td>
          <td>{{it.password}}</td>
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
      model: 'user',
      rules: {
        username: {
          lengthBetween: {
            params: [4, 12],
            msg: "最小长度需在4至12位之间"
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: "用户名格式不合法,需包含字母"
          },
          required: {
            msg: "此项为必填项"
          },
          unique: {
            params: ["user", "exists", "username"],
            msg: "用户名已存在"
          }
        },
        name: {
          required: {
            msg: "此项为必填项"
          }
        },
        password: {
          lengthBetween: {
            params: [6, 24],
            msg: "最小长度需在4至12位之间"
          },
          regex: {
            params: [/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/],
            msg: "密码必须包含字母和数字"
          },
          required: {
            msg: "密码为必填项"
          }
        }
      }
    };
  }
};
</script>

<style></style>
