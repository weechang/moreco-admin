define(function (require, exports, module) {
    "use strict";

    let local = {
        //存储
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        //取出数据
        get(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        // 如果无值，返回真值
        getTrue(key) {
            let val = this.get(key);
            if (val === undefined) {
                val = true;
            }
            return val;
        },
        // 删除数据
        remove(key) {
            localStorage.removeItem(key);
        }
    };

    module.exports = local;
});

