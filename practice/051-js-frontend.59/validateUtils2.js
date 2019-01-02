;
(function () {
    'use strict';

    let is = {
        numeric(val) {
            if (isNaN(val) || val == '')
                throw '不是数字类型';
        },
        min(val, comparison) {
            if (val < comparison)
                throw '不可小于' + comparison;
        },
        max(val, comparison) {
            if (val > comparison)
                throw '不可大于' + comparison;
        },
        between(val, min, max) {
            if (!this.max(val, max) || !this.min(val, min))
                throw '必须小于' + max + '且大于' + min;
        },
        positive(val) {

            if (val < 0)
                throw '必须是正数';
        },
        negative(val) {
            if (val > 0)
                throw '必须是负数';
        },
        in (val, arr) {
            if (arr.indexOf(val) == -1)
                throw '必须在' + arr + '之中';
        },
        minLength(val, comparison) {
            if (val.length < comparison)
                throw '长度必须大于' + comparison + '位';
        },
        maxLength(val, comparison) {
            if (val.length < comparison)
                throw '长度必须小于' + comparison + '位';
        },
        betweenLength(val, min, max) {
            if (!this.maxLength(val, max) || !this.minLength(val, min))
                throw '长度必须在' + min + '到' + max + '之间';
        },
        startsWith(val, comparison) {
            if (!val.startsWith(comparison))
                throw '必须以' + comparison + '开头';
        },
        endsWith(val, comparison) {
            if (!val.endsWith(comparison))
                throw '必须以' + comparison + '结尾';
        },
        includes(val, comparison) {
            if (!val.includes(comparison))
                throw '必须包含"' + comparison + '"';
        },
        email(val) {
            let re = /^\w+@\w+\.\w+$/;
            if (!re.test(val))
                throw '不是合法的邮箱格式';
        },
        username(val) {
            let re = /^[a-zA-Z0-9]\w+$/;
            if (!re.test(val))
                throw '不是合法的用户名格式';
        },
        phone(val, country = 'zh') {
            let re;
            switch (country) {
                case 'zh':
                    re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
                    break;
            }
            if (!re.test(val))
                throw '不是合法的手机格式';
        },
        regex(val, re) {
            if (typeof re == 'string')
                re = new RegExp(re);
            if (!re.test(val))
                throw '不是合法的格式';
        }
    }
    window.biaoValid = {
        boot,
        is,
    }

    function boot(select) {
        let el = document.querySelector(select);
        bindEvents(el);
    }

    function bindEvents(form) {
        if (form.nodeName === 'FORM') {
            bindFormKeyup(form);
            bindFormsubmit(form);
        } else {
            bindInputKeyup(form);
        }
    }

    function bindInputKeyup(form) {
        form.addEventListener('keyup', () => {
            showError(form);
        })
    }

    function bindFormKeyup(form) {
        form.addEventListener('keyup', () => {
            validForm(form);
        })
    }

    function bindFormsubmit(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validForm(form);
        })
    }

    function validForm(form) {
        let inputs = form.querySelectorAll('[data-rule]');
        let submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        let errTime = 0
        inputs.forEach(it => {
            let a = showError(it);
            errTime += a;
        })
        if (errTime == inputs.length)
            submit.disabled = false;
    }

    function showError(input) {
        let error = applyRule(input.value, input.dataset.rule);
        let html = '';
        if (!input.$errorBox) {
            let errorBox = document.createElement('div');
            errorBox.classList.add('err-box');
            input.$errorBox = errorBox;
            input.insertAdjacentElement('afterEnd', input.$errorBox);
        }
        if (error.length === 0) {
            input.$errorBox.hidden = true;
            return 1;
        } else {
            error.forEach(err => {
                html += `<div>${err}</div>`;
            })
            input.$errorBox.innerHTML = html;
            input.$errorBox.hidden = false;
            return 2;
        }
    }

    function analysisRule(str) {
        let ruleArr = str.split('|');
        let rule = {};
        ruleArr.forEach(it => {
            let ruleItem = it.split(':');
            let comparison = ruleItem[1];
            let key = ruleItem[0];
            let numArr = ['numeric', 'min', 'max', 'between', 'minLength',
                'maxLength', 'betweenLength', 'positive', 'negative'
            ];
            if (!comparison) {
                comparison = true;
            } else {
                if (numArr.indexOf(key) >= 0)
                    comparison = parseFloat(comparison);
                if (key === 'in') {
                    comparison = comparison.split(',');
                }
            }
            rule[key] = comparison;
        });
        return rule;
    }

    function applyRule(val, str) {
        let rule = analysisRule(str);
        let error = [];
        for (let key in rule) {
            try {
                is[key](val, rule[key]);
            } catch (e) {
                error.push(e);
            }
        }
        return error;
    }
})();