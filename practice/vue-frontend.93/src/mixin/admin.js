import api from "../lib/api.js";
import { call as valee } from "../lib/valee.js";
import {fileUrl} from '../lib/helper'
export default {
  data() {
    return {
      list: [],
      total: 0,
      ui: {
        formVisible: true
      },
      form: {},
      timer: null,
      originalForm: null,
      rules: {
      
      },
      errors: {},
      readParam: {
        limit: 2,
        page: 1
      },
      fileUrl
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    flip(page){
      this.readParam.page=page;
      this.read();
    },
    read() {
      api(`${this.model}/read`, this.readParam).then(r => {
        // r.data.forEach(it => {
        //   if(it.prop)
        //   it.prop=JSON.stringify(it.prop) ;

        // });
        this.list = r.data;
        this.total = r.total;
        
      });
    },
    remove(id) {
      if (!confirm("确认删除")) return;
      api(`${this.model}/delete`, { id }).then(() => {
        this.read();
      });
    },
    fill(row) {
      this.form = row;
      this.originalForm = { ...this.form };
    },
    createOrUpdate() {
      let f = this.form;
      let action;
      if (!this.validateForm()) return;
      if (f.id) {
        action = "update";
      } else {
        action = "create";
      }
      api(`${this.model}/${action}`, f).then(() => {
        this.resetForm();
        this.read();
      });
    },
    resetForm() {
      // this.ui.formVisible = false;
      this.form = {};
    },
    debounceValidate(field) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.validate(field);
      }, 500);
    },
    validate(field) {
      let rules = this.rules[field];
      let value = this.form[field];
      let fieldValid = true;
      for (let key in rules) {
        let rule = rules[key];
        let params = rule.params || [];
        let valid = valee(key, value, ...params);
        if (typeof valid == "boolean") {
          this.afterValidate(field, key, valid);
          if (!valid) fieldValid = false;
        } else {
          valid.then(r => {
            this.afterValidate(field, key, r);
          });
        }
      }
      return fieldValid;
    },
    afterValidate(field, key, valid) {
      let fieldObj = this.errors[field];
      if (!fieldObj) {
        fieldObj = this.$set(this.errors, field, {});
      }
      this.$set(fieldObj, key, !valid);
    },
    validateForm() {
      let rules = this.rules;
      let valida = true;
      for (let key in rules) {
        if (this.form.id && this.form[key] == this.originalForm[key]) {
          continue;
        }
        if (!this.validate(key)) {
          valida = false;
        }
      }
      return valida;
    },
    makeSelect(prop){
      return it=>{
        this.form[prop]=it.id;
      }
    }
  }
};