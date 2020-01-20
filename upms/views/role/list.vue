<template>
    <a-card :bordered="false">
        <!--搜索框-->
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="角色名称">
                            <a-input placeholder="角色名称" v-model="queryParam.roleName"></a-input>
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
                    <a-button type="primary" icon="plus" @click="editShow()">创建角色</a-button>
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
            <span slot="action" slot-scope="text, record">
                <a-button size="small" @click="editShow(record.id)">编辑</a-button>
                <a-button size="small" @click="editShow(record.id)">授权资源</a-button>
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
                <a-form-item label="角色名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.roleName"/>
                </a-form-item>
                <a-form-item label="角色备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.remark"/>
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
                        title: '角色名称',
                        dataIndex: 'roleName',
                        key: 'roleName'
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        key: 'remark'
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
            }
        },
        mounted: function () {
            let that = this;
            seajs.use('~/upms/api/role', function (api) {
                that.API = api;
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
