define(function (require, exports, module) {
    "use strict";

    let mock = require('@/utils/mock');

    // 分页查询
    Mock.mock(/\/moreco\/upms\/app/, 'get', () => {
        let rst = mock.ok({
            "records":[
                {
                    "createdTime":"2020-01-10 15:22:39",
                    "createdBy":"-99",
                    "modifiedTime":"2020-01-19 16:23:50",
                    "modifiedBy":"1",
                    "extData":{

                    },
                    "id":"1",
                    "groupId":null,
                    "appCode":"moreco-boot-demo",
                    "appName":"Spring Boot 应用演示",
                    "secretKey":"23062654-C383-4899-821E-7548C10E3986"
                },
                {
                    "createdTime":"2020-01-19 16:10:52",
                    "createdBy":"1",
                    "modifiedTime":"2020-01-19 16:10:52",
                    "modifiedBy":"1",
                    "extData":{

                    },
                    "id":"1218808023334694913",
                    "groupId":null,
                    "appCode":"moreco-upms",
                    "appName":"Moreco 权限管理",
                    "secretKey":"671DA672-63E9-4D6B-B7D5-74B099D5A9AA"
                }
            ],
            "total":2,
            "size":10,
            "current":1,
            "orders":[

            ],
            "searchCount":true,
            "pages":1
        });
        return rst;
    });
});
