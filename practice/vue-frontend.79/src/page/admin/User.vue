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
          <th>{{it.name || '-'}}</th>
          <th>{{it.username || '-'}}</th>
          <th>{{it.intro || '-'}}</th>
          <th>{{it.password}}</th>
          <th>
            <div class="btn-group">
              <button @click="fill(it)">更新</button>
              <button @click="remove(it.id)">删除</button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../lib/api.js';
import { call as valee } from '../../lib/valee';
export default {
  data() {
    return {
      form: {},
      ui: {
        showForm: true
      },
      list: [],
      rules: {
        username: {
          lengthBetween: {
            params: [4, 12],
            msg: '最小长度需在4至12位之间'
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: '用户名格式不合法,需包含字母'
          },
          required: {
            msg: '此项为必填项'
          },
          unique: {
            params: ['user', 'exists', 'username'],
            msg: '用户名已存在'
          }
        },
        name: {
          required: {
            msg: '此项为必填项'
          }
        },
        password: {
          lengthBetween: {
            params: [6, 24],
            msg: '最小长度需在4至12位之间'
          },
          regex: {
            params:[/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/] ,
            msg: '密码必须包含字母和数字'
          },
          required: {
            msg: '密码为必填项'
          }
        }
      },
      errors: {
        // username:{
        //   lengthBetween:true,
        //   regex:true,
        // }
      },
      timer: null
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    debounceValidate(field) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.validate(field);
      }, 500);
    },
    validate(field) {
      let value = this.form[field];
      let rules = this.rules[field];
      let fieldValid = true;
      for (let key in rules) {
        let rule = rules[key];
        let params = rule.params || [];
        let valid = valee(key, value, ...params);
        if (typeof valid == 'boolean') {
          this.afterValidate(field,key,valid);
          if(!valid)
          fieldValid = false;
        }else{
          valid.then(r=>{
            this.afterValidate(field,key,r);
          })
        }
      }
      return fieldValid;
    },
    validateForm(){
      let rules=this.rules;
      for(let field in rules){
       if(!this.validate(field)) 
       return false;
      }
       return true;
    },
  
    afterValidate(field,key,valid) {
      let fieldObj = this.errors[field];
      if (!fieldObj) {
        fieldObj = this.$set(this.errors, field, {});
      }

      this.$set(fieldObj, key, !valid);
    },
    createOrUpdate() {
      this.validateForm();
       if (!this.validateForm())
          return;
      let action = 'create';
      let isUpdate = this.form.id;
      if (isUpdate) action = 'update';
      api(`user/${action}`, this.form).then(r => {
        this.resetForm();
        this.read();
        this.hideForm();
      });
    },
    hideForm() {
      this.ui.showForm = false;
    },
    showForm() {
      this.ui.showForm = true;
    },
    resetForm() {
      this.form = {};
      this.errors={};
    },
    read() {
      api('user/read').then(r => {
        this.list = r.data;
      });
    },
    fill(it) {
      this.form = it;
      this.showForm();
    },
    remove(id) {
      if (!confirm('确认删除')) return;
      api('user/delete', { id }).then(r => {
        this.read();
      });
    }
  }
};
</script>

<style></style>
