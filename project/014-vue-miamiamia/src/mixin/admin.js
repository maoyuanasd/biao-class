import api from "../lib/api.js";
import { call as valee } from "../lib/valee.js";
import {fileUrl} from '../lib/helper';
export default {
  data() {
    return {
      ui:{
        formVisible:false
      },
      form: {},
      originalform: null,
      rules: {
        
      },
      errors: {},
      list: [],
      timer: null,
      readParam: {
        limit: 10,
        page: 1
      },
      total: 0,
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
    validate(field) {
      let rules = this.rules[field];
      let value = this.form[field];
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
    validateForm() {
      let rules = this.rules;
      let valid = true;
      for (let field in rules) {
        if (this.form.id && this.form[field] == this.originalform[field])
          continue;
        if (!this.validate(field)) valid = false;
      }
      return valid;
    },
    debounceValidate(field) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.validate(field);
      }, 500);
    },
    read() {
      api(`${this.model}/read`, this.readParam).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
    },
    createOrUpdate() {
      let action;
      let f = this.form;
      if (!this.validateForm()) return;
      if (f.id) {
        action = "update";
      } else {
        action = "create";
      }
      api(`${this.model}/${action}`, f).then(() => {
        this.resetForm();
        this.read();
        this.ui.formVisible=false;
      });
    },
    resetForm() {
      this.form = {};
    },
    remove(id) {
      if (!confirm("确认删除")) {
        return;
      }
      api(`${this.model}/delete`, { id }).then(() => {
        this.read();
      });
    },
    fill(row) {
      this.form = row;
      this.originalform = row;
      scrollTo(0,0);
      this.ui.formVisible=true;

    },
    makeSelect(key){
       return it=>{
          this.form[key]=it.id;  
       }
    },
  }
};