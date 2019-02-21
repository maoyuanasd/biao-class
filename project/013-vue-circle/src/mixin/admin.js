import api from "../lib/api.js";
import { call as valee } from "../lib/valee";
import Pagination from '../components/Pagination';

export default {
  data() {
    return {
      total:0,
      readParams:{
        limit:5,
       page:1
      },
      fieldValid:false,
      form: {},
      ui: {
        showForm: true
      },
      list: [],
     
      errors: {},
      timer: null
    };
  },
  components:{Pagination},
  mounted() {
    this.read();
  },
  methods: {
    flip(page){
      this.readParams.page=page;
      this.read();
    },
    debounceValidate(field) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.validate(field);
        this.validateForm();
      }, 500);
    },
    validate(field) {
      let rules = this.rules[field];
     let  fieldValids=true;
      for (let key in rules) {
        let rule = rules[key];
        let value = this.form[field];
        let params = rule.params || [];
        let valid = valee(key, value, ...params);
        if (typeof valid === "boolean") {
          this.afterValidate(field, valid, key);
          if(!valid)
          fieldValids=false;
        } else {
          valid.then(r => {
            this.afterValidate(field, r, key);
          });
        }
      }
      return fieldValids;
    },
    validateForm(){
      let rules=this.rules;
   this.fieldValid=true;
      for(let field in rules){
        if(!this.validate(field))
        this.fieldValid=false;
      }
    },
    afterValidate(field, valid, key) {
      let fieldObj = this.errors[field];
      if (!fieldObj) fieldObj = this.$set(this.errors, field, {});
      this.$set(fieldObj, key, !valid);
    },
    createOrUpdate() {
      if(this.beforeCreateOrUpdate){
        this.beforeCreateOrUpdate();
      }
      this.validateForm();
      let action = "create";
      let isUpdate = this.form.id;
      if (isUpdate) action = "update";
      api(`${this.model}/${action}`, this.form).then(() => {
        if(this.afterCreateOrUpdate){
          this.afterCreateOrUpdate();
        }
        this.resetForm();
        this.hideForm();
        this.read();
      });
    },
    resetForm() {
      this.form = {};
      this.errors={};
      this.fieldValid=false;
    },
    toggleForm (){
      if(this.ui.showForm){
        this.hideForm();
      }else{
        this.showForm();
        this.resetForm();
      }
    },
    hideForm() {
      this.ui.showForm = false;
    },
    showForm() {
      this.ui.showForm = true;
    },
    read() {
      api(`${this.model}/read`,this.readParams).then(r => {
        this.list = r.data;
        this.total=r.total;
      });
    },
    fill(it) {
      this.form = it;
      this.showForm();
    },
    remove(id) {
      if (!confirm("确认删除")) return;
      api(`${this.model}/delete`, { id }).then(() => {
        this.read();
      });
    }
  }
};