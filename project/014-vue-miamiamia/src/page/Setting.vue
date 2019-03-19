<template>
  <div>
    <h1>设置</h1>
    <div>
      <dl class="pair">
        <dt>昵称</dt>
        <dd>
          <span>{{meSave.nickname}}</span>
          <span v-if="editMode.nickname">
            <input
              placeholder="新的昵称"
              @keyup="debounceValidate('nickname')"
              type="text"
              v-model="me.nickname"
            >
            <button @click="update('nickname')">完成</button>
          </span>
          <button @click="inputTogget('nickname')">
            <span v-if="editMode.nickname">取消</span>
            <span v-else>编辑</span>
          </button>
        </dd>
        <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.nickname"
          >{{rules.nickname[e].msg}}</span>
        </span>
      </dl>
      <dl class="pair">
        <dt>手机</dt>
        <dd>
          <span>{{meSave.phone}}</span>
          <span v-if="editMode.phone">
            <input
              placeholder="新的手机号"
              @keyup="debounceValidate('phone')"
              type="text"
              v-model="me.phone"
            >
            <input type="text" placeholder="请输入验证码" v-model="me.phoneCode">
            <captcha
              sendBy="phone"
              :receiver="me.phone"
              @send="storeCaptcha('phone',$event)"
              :className="'code'"
            />
            <button @click="update('phone')">完成</button>
          </span>
          <button @click="inputTogget('phone')">
            <span v-if="editMode.phone">取消</span>
            <span v-else>编辑</span>
          </button>
        </dd>
        <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.phone"
          >{{rules.phone[e].msg}}</span>
          <span class="error" v-if="invalidCaptcha.phone">验证码不正确</span>
        </span>
      </dl>
      <dl class="pair">
        <dt>邮箱</dt>
        <dd>
          <span>{{meSave.mail}}</span>
          <span v-if="editMode.mail">
            <input
              placeholder="新的邮箱"
              @keyup="debounceValidate('mail')"
              type="text"
              v-model="me.mail"
            >
            <input type="text" placeholder="请输入验证码" v-model="me.mailCode">
            <captcha
              sendBy="mail"
              :receiver="me.mail"
              @send="storeCaptcha('mail',$event)"
              :className="'code'"
            />
            <button @click="update('mail')">完成</button>
          </span>
          <button @click="inputTogget('mail')">
            <span v-if="editMode.mail">取消</span>
            <span v-else>编辑</span>
          </button>
        </dd>
        <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.mail"
          >{{rules.mail[e].msg}}</span>
          <span class="error" v-if="invalidCaptcha.mail">验证码不正确</span>
        </span>
      </dl>
      <dl class="pair">
        <dt>密码</dt>
        <dd>
          <span>...</span>
          <span v-if="editMode.password">
            <input type="password" placeholder="请输入原来的密码" v-model="me.oldPassword">
            <input
              placeholder="新的密码"
              @keyup="debounceValidate('password')"
              type="password"
              v-model="me.password"
            >
            <button @click="update('password')">完成</button>
          </span>
          <button @click="inputTogget('password')">
            <span v-if="editMode.password">取消</span>
            <span v-else>编辑</span>
          </button>
        </dd>
        <span class="error-list">
          <span
            class="error"
            v-if="invalid"
            v-for="(invalid,e) in errors.password"
          >{{rules.password[e].msg}}</span>
          <span class="error" v-if="invalidCaptcha.password">和原来的密码不一样</span>
        </span>
      </dl>
    </div>
  </div>
</template>
<script>
import api from '../lib/api.js'
import session from '../lib/session.js'
import { call as valee } from '../lib/valee.js'
import Captcha from '../component/Captcha'

export default {
  components: { Captcha },
  data() {
    return {
      editMode: {
        nickname: false,
        phone: false,
        mail: false,
        password: false,
      },
      me: {},
      meSave: {},
      updatePending: false,
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
      errors: {},
      timer: null,
      invalidCaptcha: {
        phone: false,
        mail: false,
        password:false,
      }
    }
  },
  mounted() {
    this.find();
  },
  methods: {
    debounceValidate(field) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.validate(field);
      }, 500);
    },
    storeCaptcha(type, code) {
      this.$set(this.meSave, `${type}Code`, code);
    },
    verifyCaptcha(type) {
      if (!this.meSave[`${type}Code`])
        return;
      return this.meSave[`${type}Code`] == this.me[`${type}Code`];
    },
    verifyPassword() {
      if(!this.me.oldPassword)
      return;
       return this.me.oldPassword==this.meSave.password;
    },
    find() {
      api('user/find', { id: session.user().id }).then(r => {
        this.meSave = r.data;
        // this.meCopy();
      })
    },
    // meCopy() {
    //   this.meSave = { ...this.me };
    // },
    changed(type) {
      return this.me[type] == this.meSave[type];
    },
    update(type) {
      if (this.changed(type))
        return;
      if (!this.validate(type)) {
        return;
      }
      if(type=='phone' || type=='mail'){

        if (!this.verifyCaptcha(type)) {
          this.fieldValid = false;
          this.invalidCaptcha[type] = true;
          return
        }
      }
      if(type=='password'){
        if(!this.verifyPassword()){
          this.invalidCaptcha[type] = true;
          return
        }
      }
      api(`user/update`, { [type]: this.me[type], id: session.user().id }).then(r => {
        // this.editMode[type]=false;
        this.meSave[type] = r.data[type];
        // this.me[type]=this.meSave[type];
        this.inputTogget(type)
      })

    },
    validate(field) {
      let rules = this.rules[field];
      let value = this.me[field];
      let fieldValid = true;


      for (let key in rules) {
        let rule = rules[key];
        let params = rule.params || [];
        let valid = valee(key, value, ...params);
        if (typeof valid == "boolean") {
          this.validateAfter(field, key, valid);
          if (!valid) fieldValid = false;
        } else {
          valid.then(r => {
            this.validateAfter(field, key, r);
          });
        }
      }
      return fieldValid;
    },
    validateAfter(field, key, valid) {
      let filedObj = this.errors[field];
      if (!filedObj) {
        filedObj = this.$set(this.errors, field, {});
      }
      // return
      this.$set(filedObj, key, !valid);
    },
    inputTogget(type) {
      if (this.editMode[type] == true) {
        this.invalidCaptcha[type] = false;
        this.$set(this.invalidCaptcha,type,false);

        this.errors[type] = {};
        this.me[type] = null;
        this.me.oldPassword=null;
        this.$set(this.editMode, type, false);
      } else {

        this.$set(this.editMode, type, true);
        // if(this.editMode[type]==false){
        //   // this.editMode[type]==true;
        // }
      }
    }
  },

}
</script>
<style scoped>
.code {
  display: inline-block;
}
</style>
