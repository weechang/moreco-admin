define(function (require, exports, module) {
    "use strict";

    let mock = require('@/utils/mock');

    // 登入
    Mock.mock(/\/login/, 'post', () => {
        let rst = mock.ok({
            "jwt_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3OTc1MTU5NSwiaWF0IjoxNTc5NzQ3OTk1LCJ1c2VySWQiOjF9.jNmpMQu7DZQR9bQGOLpGs8zo4ncdF70PhcQ-GELtcpw"
        });
        return rst;
    });

    // 获取用户信息
    Mock.mock(/\/moreco\/upms\/user\/current/, 'get', () => {
        let rst = mock.ok({
            "createdTime":"2019-09-05 17:53:51",
            "createdBy":null,
            "modifiedTime":"2020-01-16 18:43:03",
            "modifiedBy":"-99",
            "extData":{
                "userStatus":"可用"
            },
            "id":"1",
            "username":"admin",
            "nickName":"管理员",
            "avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            "email":"zhangwei_sc@foxmail.com",
            "mobile":"13012345678",
            "triedTimes":1,
            "lockedTime":null,
            "userStatus":1
        });
        return rst;
    });


    /*** 登出 */
    let logout = function () {
        return axios({
            url: api.logout,
            method: 'get'
        })
    };

});
