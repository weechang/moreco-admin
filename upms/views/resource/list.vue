<template>
    <a-card :bordered="false">
        <!--搜索框-->
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="资源名称">
                            <a-input placeholder="资源名称" v-model="queryParam.name"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="资源编码">
                            <a-input placeholder="资源编码" v-model="queryParam.code"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="资源类型">
                            <a-select placeholder="资源类型" default-value="" v-model="queryParam.resourceType">
                                <a-select-option value="">全部</a-select-option>
                                <a-select-option v-for="item in resourceTypes" :value="item.value" v-bind:key="item.value">{{item.desc}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <span class="table-page-search-submitButtons">
                          <a-button type="primary" @click="queryPage">查询</a-button>
                          <a-button style="margin-left: 8px" @click="resetQuery">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>

            <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                    <a-button type="primary" icon="plus" @click="editShow()">创建资源</a-button>
                </a-col>
            </a-row>
        </div>

        <!--表格展示-->
        <a-table
                :columns="columns"
                :row-key="record => record.id"
                :data-source="dataList"
                :pagination="pageParam"
                :loading="loading"
                :scroll="(device === 'mobile' ? {x:800} : {})">
            <span slot="icon" slot-scope="text, record">
                <a-icon :type="text" />
            </span>
            <span slot="resourceStatus" slot-scope="text, record">
                <a-switch checked-children="启用" un-checked-children="禁用" :checked="record.resourceStatus === 1"  @click="statusToggle(record)"/>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button size="small" @click="editShow(record.id)">编辑</a-button>
                <a-button size="small" @click="editShow(record.id)">管理下级</a-button>
                <br/>
                <a-button type="danger" size="small" @click="delRow(record.id)">删除</a-button>
            </span>
        </a-table>

        <!--编辑弹框-->
        <a-modal
                title="编辑"
                :visible="editVisible"
                :confirm-loading="editLoading"
                @ok="saveOrUpdate"
                @cancel="editHide"
                cancel-text="取消"
                ok-text="保存"
        >
            <a-form>
                <a-form-item label="所属应用" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-select placeholder="资源类型" default-value="" v-model="editObj.appId">
                        <a-select-option v-for="item in appList" :value="item.id" v-bind:key="item.id">{{item.appName}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="资源名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.name"/>
                </a-form-item>
                <a-form-item label="资源类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-select placeholder="资源类型" default-value="" v-model="editObj.resourceType">
                        <a-select-option v-for="item in resourceTypes" :value="item.value" v-bind:key="item.value">{{item.desc}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="资源图标" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.icon"/>
                </a-form-item>
                <a-form-item label="资源状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.resourceStatus"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>

<script>
    let API = null;
    module.exports = {
        data: function () {
            return {
                columns: [
                    {
                        title: '所属系统',
                        dataIndex: 'extData.appId',
                        key: 'appId'
                    },
                    {
                        title: '资源名称',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '资源编码',
                        dataIndex: 'code',
                        key: 'code'
                    },
                    {
                        title: '资源图标',
                        dataIndex: 'icon',
                        key: 'icon',
                        scopedSlots: {customRender: 'icon'},
                    },
                    {
                        title: '资源类型',
                        dataIndex: 'extData.resourceType',
                        key: 'resourceType'
                    },
                    {
                        title: '资源状态',
                        dataIndex: 'extData.resourceStatus',
                        key: 'resourceStatus',
                        scopedSlots: {customRender: 'resourceStatus'},
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        key: 'remark'
                    },
                    {
                        title: '排序',
                        dataIndex: 'orderNo',
                        key: 'orderNo'
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createdTime',
                        key: 'createdTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
                        fixed: 'right',
                        scopedSlots: {customRender: 'action'},
                    },
                ],
                appList: [],
                resourceTypes: [],
                resourceStatuses: [],
                queryParam: {},
                pageParam: {},
                dataList: [],
                loading: false,
                editVisible: false,
                editLoading: false,
                editObj: {}
            };
        },
        methods: {
            /*** 页面初始化 */
            toPage: function() {
                this.API.toPage().then(res => {
                    this.appList = res.data.appList;
                    this.resourceTypes = res.data.resourceTypes;
                    this.resourceStatuses = res.data.resourceStatuses;
                });
            },
            /*** 分页查询 */
            queryPage: function () {
                this.loading = true;
                this.API.page(this.queryParam, this.pageParam).then(res => {
                    let data = res.data;
                    this.dataList = data.records;
                    this.pageParam.current = data.current;
                    this.pageParam.pageSize = data.size;
                    this.pageParam.total = data.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            /*** 重置查询条件 */
            resetQuery: function () {
                this.queryParam = {};
            },
            /*** 新增&编辑 */
            editShow: function (id) {
                this.editVisible = true;
                this.editObj = {};
                if (id !== null && id !== undefined) {
                    this.editObj.id = id;
                    this.API.detail(id).then(res => {
                        this.editObj = res.data;
                    });
                }
            },
            /*** 关闭编辑框 */
            editHide: function () {
                this.editObj = {};
                this.editVisible = false;
            },
            /*** 新增&编辑 */
            saveOrUpdate: function() {
                this.editLoading = true;
                this.API.saveOrUpdate(this.editObj).then(res => {
                    this.editVisible = false;
                    this.queryPage();
                }).finally(() => {
                    this.editLoading = false;
                });
            },
            /*** 删除 */
            delRow: function (id) {
                let that = this;
                this.$confirm({
                    title: '确认删除该记录?',
                    content: '删除后将不可恢复',
                    onOk() {
                        that.API.delRow(id).then(() => {
                            that.queryPage();
                        });
                    }
                });
            },
            /*** 状态修改 */
            statusToggle: function (row) {
                let status = 0;
                if (row.resourceStatus === 0) {
                    status = 1;
                }
                let obj = {
                    id: row.id,
                    resourceStatus: status
                };
                this.API.saveOrUpdate(obj).then(res => {
                    this.$message.success('修改成功');
                    this.queryPage();
                });
            }
        },
        mounted: function () {
            let that = this;
            seajs.use('~/upms/api/resource', function (api) {
                that.API = api;
                that.toPage();
                that.queryPage();
            });
        },
        computed: {
            device() {
                return this.$store.getters.device;
            },
            collapsed() {
                return this.$store.getters.foldMenu;
            }
        }
    }
</script>
