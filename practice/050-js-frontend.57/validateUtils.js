;
(function () {
    'use strict';

    let is = {
        numeric(val) {
            return !isNaN(val);
        },
        min(val, comparison) {
            if (!this.numeric(val))
                return false;
            return val >= comparison;
        },
        max(val, comparison) {
            if (!this.numeric(val))
                return false;
            return val <= comparison;
        },
        between(val, min, max) {
            return this.max(val, max) && this.min(val, min);
        },
        positive(val) {
            if (!this.numeric(val))
                return false;
            return val > 0;
        },
        negative(val) {
            if (!this.numeric(val))
                return false;
            return val < 0;
        },
        in (val, arr) {
            return arr.indexOf(val) >= 0;
        },
        minLength(val, comparison) {
            return val.length >= comparison;
        },
        maxLength(val, comparison) {
            return val.length <= comparison;
        },
        betweenLength(val, min, max) {
            return this.maxLength(val, max) && this.minLength(val, min);
        },
        startsWith(val, comparison) {
            return val.startsWith(comparison);
        },
        endsWith(val, comparison) {
            return val.endsWith(comparison);
        },
        includes(val, comparison) {
            return val.includes(comparison);
        },
        email(val) {
            let re = /^\w+@\w+\.\w+$/;
            return re.test(val);
        },
        username(val) {
            let re = /^[a-zA-Z0-9]\w+$/;
            return re.test(val);
        },
        phone(val, country = 'zh') {
            let re;
            switch (country) {
                case 'zh':
                    re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
                    break;
            }
            return re.test(val);
        },
        regex(val, re) {
            if (typeof re == 'string')
                re = new RegExp(re);
            return re.test(val);
        }
    }
    window.biaoValid = {
        validata(val, strRule) {
          return   applyRules(val, parseRules(strRule));
        },
        applyRules,
        is,
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

                if(key=='in'){
                    comparison=comparison.split(',');
                }
            }
            rule[key] = comparison;
        });
        return rule;
    }

    function applyRules(val, str) {
        let valid=true;
        for (let key in str) {
            let result = is[key](val, str[key]);
            if(!result)
            valid=false;
        }
        return valid;
    }
})();