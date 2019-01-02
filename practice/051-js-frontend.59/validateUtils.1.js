;
(function () {
    'use strict';

    let is = {
        numeric(val) {
            if (isNaN(val) || val=='')
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
    let form;
    window.biaoValid = {
        boot,
        validata,
        applyRules,
        is,
    }
    
    function boot(select){
        form=document.querySelector(select);
        bindEvents();
    }
    function bindEvents(){
        if(form.nodeName=='FORM'){
            bindFormKeyup(form);
            bindFormsubmit(form);
        }else{
           
            bindInputKeyup(form);
        }
    }
    function bindFormKeyup(form){
          let inputs=form.querySelectorAll('[data-rule]');
          form.addEventListener('keyup',e=>{
              inputs.forEach(it => {
                  let err=  validata(it.value,it.dataset.rule);
                  showError(it,err);
              });
          })
    }
    function bindInputKeyup(form){
        form.addEventListener('keyup',e=>{
            let err=  validata(form.value,form.dataset.rule);
            showError(form,err);
        });
    }
    function bindFormsubmit(form){
        let inputs=form.querySelectorAll('[data-rule]');
        form.addEventListener('submit',e=>{
            e.preventDefault();
            inputs.forEach(it => {
                let err=  validata(it.value,it.dataset.rule);
                showError(it,err);
            });
        });
    }
    function showError(el,errArr){
        if(errArr.length==0){
            el.$errorBox.hidden=true;
            return;
        }
        if(!el.$errorBox){
            let errorBox=document.createElement('div');
            el.$errorBox=errorBox;
            el.insertAdjacentElement('afterEnd',el.$errorBox);
        }   
        
        let html='';
        el.$errorBox.hidden=false;
            el.$errorBox.classList.add('error-box');
            errArr.forEach(key => {
                html+=`<div>${key}</div>`;
            });
            el.$errorBox.innerHTML=html;
    }
    function validata(val, strRule) {
        return applyRules(val, parseRules(strRule));
    }

    function parseRules(str) {
        let rule = {};
        let ruleArr = str.split('|');
        ruleArr.forEach(it => {
            let itArr = it.split(':');
            let key = itArr[0];
            let comparison = itArr[1];
            let numRules = ['numeric', 'min', 'max',
                'between', 'minLength', 'maxLength',
            ];
            if (!comparison)
                comparison = true;
            else {
                if (numRules.indexOf(key) >= 0) {
                    comparison = parseFloat(comparison);
                }
                if (key == 'in') {
                    comparison = comparison.split(',');
                }
            }
            rule[key] = comparison;
        });
        return rule;
    }

    function applyRules(value, rules) {
        let errors = [];

    // 循环验证规则，如：
    // {min: 10, max: 20}
    for (let key in rules) {
      // 以 min:10 为例
      // key就是'min'
      // ru就是10
      let ru = rules[key];

      try {
        // 相当于 is.min(6, 10)
        is[key](value, ru);
      } catch (e) { // 捕获验证错误
        // 推入错误数组中
        errors.push(e);
      }
    }
    // 返回错误数组
    return errors;
    }
})();