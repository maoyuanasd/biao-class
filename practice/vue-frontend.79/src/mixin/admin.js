import api from '../lib/api.js';
import {
    call as valee
} from '../lib/valee';
import Pagination from '../components/Pagination';
export default {
    data() {
        return {
            total: 0,
            readParams: {
                limit: 5,
                page: 1,
            },
            form: {},
            ui: {
                showForm: true
            },
            list: [],

            errors: {
                // username:{
                //   lengthBetween:true,
                //   regex:true,
                // }
            },
            timer: null
        };
    },
    components: {
        Pagination
    },
    mounted() {
        this.read();
    },
    methods: {
        filp(page) {
            this.readParams.page = page;
            this.read();
        },
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
                    this.afterValidate(field, key, valid);
                    if (!valid)
                        fieldValid = false;
                } else {
                    valid.then(r => {
                        this.afterValidate(field, key, r);
                    })
                }
            }
            return fieldValid;
        },
        validateForm() {
            let rules = this.rules;
            let valid = true;
            for (let field in rules) {
                if (!this.validate(field))
                    valid = false;
            }
            return valid;
        },

        afterValidate(field, key, valid) {
            let fieldObj = this.errors[field];
            if (!fieldObj) {
                fieldObj = this.$set(this.errors, field, {});
            }

            this.$set(fieldObj, key, !valid);
        },
        createOrUpdate() {
            if(this.beforeCreateOrUpdate)
            this.beforeCreateOrUpdate();
            this.validateForm();
            if (!this.validateForm())
                return;
            let action = 'create';
            let isUpdate = this.form.id;
            if (isUpdate) action = 'update';
            api(`${this.model}/${action}`, this.form).then(() => {
                if (this.afterCreateOrUpdate)
                this.afterCreateOrUpdate();
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
            this.errors = {};
        },
        read() {
            if (this.beforeRead)
                this.beforeRead();
            api(`${this.model}/read`, this.readParams).then(r => {
                if (this.afterRead)
                this.afterRead();
                this.list = r.data;
                this.total = r.total;
            });
        },
        fill(it) {
            this.form = it;
            this.showForm();
        },
        remove(id) {
            if (this.beforeRemove)
                this.beforeRemove();
            if (!confirm('确认删除')) return;
            api(`${this.model}/delete`, {
                id
            }).then(() => {
                if (this.afterRemove)
                    this.afterRemove();
                this.read();
            });
        }
    }
};