;
(function () {
    'use strict';
    window.vali={
        isUsername,
        isEmail,
        isPhone,
        isPassword,
        betweenLength,
        between,
        positive,
    };
    function isUsername(str) {
        if (!betweenLength(str, 8, 4) || str.includes('辣鸡'))
            return false;
        return true;

    }

    function isEmail(str) {
        if (!str.includes('@'))
            return false;
        return true;
    }

    function isPhone(str) {
        if ((str.length != 11 &&
                str.length != 13 &&
                str.length != 14) ||
            !str.startsWith('1'))
            return false;
        return true;
    }

    function isPassword(str) {
        if (!betweenLength(str, 64, 8))
            return false;
        return true;
    }

    function between(num, max, min) {
        return num >= min && num <= max;
    }

    function betweenLength(str, max, min) {
        return between(str.length, max, min)

    }

    function positive(num) {
        return num >= 0;
    }
})();