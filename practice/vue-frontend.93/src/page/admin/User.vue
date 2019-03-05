<template>
  <div>
    <h1>用户管理</h1>
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
          <span class="title">昵称</span>
          <input class="el-input__inner" type="text" @keyup="debounceValidate('nickname')" v-model="form.nickname">
           <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.nickname"
          >{{rules.nickname[e].msg}}</span>
           </span>
        </label>
        <label>
          <span class="title">电话</span>
          <input class="el-input__inner" type="text" v-model="form.phone" @keyup="debounceValidate('phone')">
           <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.phone"
          >{{rules.phone[e].msg}}</span>
           </span>
        </label>
        <label>
          <span class="title">邮箱</span>
          <input class="el-input__inner" type="text" v-model="form.mail" @keyup="debounceValidate('mail')">
           <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.mail"
          >{{rules.mail[e].msg}}</span>
           </span>
        </label>
        <label>
          <span class="title">密码</span>
          <input class="el-input__inner" type="text" v-model="form.password" @keyup="debounceValidate('password')">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.password"
          >{{rules.password[e].msg}}</span>
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
        <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="mail" label="邮箱"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center">
        <el-pagination layout="prev, pager, next"  @current-change="flip" :current-page="readParam.page" :total="total" :page-size="readParam.limit"></el-pagination>
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
     model:'user',
      rules: {
        nickname: {
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
            params: ["user", "exists", "nickname"],
            msg: "用户名已存在"
          }
        },
        phone: {
          phone: {
            params: [],
            msg: "不是合法的手机格式"
          },

          unique: {
            params: ["user", "exists", "phone"],
            msg: "手机号已存在"
          }
        },
        mail: {
          mail: {
            params: [],
            msg: "不是合法的邮箱格式"
          },

          unique: {
            params: ["user", "exists", "mail"],
            msg: "邮箱已存在"
          }
        },
        password: {
          lengthBetween: {
            params: [6, 24],
            msg: "最小长度需在6至24位之间"
          },
          regex: {
            params: [/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/],
            msg: "密码必须包含字母和数字"
          },
          required: {
            msg: "密码为必填项"
          }
        }
      },
     
    };
  },
  
};
</script>
<style scoped>
form {
  width: 50%;
}
</style>

