<template>
    <a-card :bordered="false">
        <!--搜索框-->
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="用户名">
                            <a-input placeholder="用户名" v-model="queryParam.username"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="状态">
                            <a-select placeholder="状态" default-value="" v-model="queryParam.userStatus">
                                <a-select-option value="">全部</a-select-option>
                                <a-select-option v-for="item in userStatuses" :value="item.value"
                                                 v-bind:key="item.value">{{item.desc}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="昵称">
                            <a-input placeholder="昵称" v-model="queryParam.nickName"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="邮箱">
                            <a-input placeholder="邮箱" v-model="queryParam.email"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="手机号">
                            <a-input placeholder="手机号" v-model="queryParam.mobile"></a-input>
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
                    <a-button type="primary" icon="plus" @click="editShow()">新建用户</a-button>
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
            <span slot="userStatus" slot-scope="text, record">
                <a-tag v-if="record.userStatus === 0" color="yellow">
                    {{text}}
                </a-tag>
                <a-tag v-else-if="record.userStatus === 1" color="green">
                    {{text}}
                </a-tag>
                <a-tag v-else color="red">
                    {{text}}
                </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button size="small" @click="editShow(record.id)">编辑</a-button>
                <br/>
                <a-button size="small" @click="assignRoleShow(record)">分配角色</a-button>
                <br/>
                <a-button size="small" type="danger" @click="resetPwd(record.id)">重置密码</a-button>
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
                <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input :disabled="(editObj.id !== null && editObj.id !== undefined)" v-model="editObj.username"/>
                </a-form-item>
                <a-form-item label="昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.nickName"/>
                </a-form-item>
                <a-form-item label="邮箱" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.email"/>
                </a-form-item>
                <a-form-item label="手机号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="editObj.mobile"/>
                </a-form-item>
            </a-form>
        </a-modal>

        <!--分配角色弹框-->
        <a-modal
                title="分配角色"
                :visible="assignVisible"
                :confirm-loading="assignLoading"
                @ok="saveAssign"
                @cancel="assignHide"
                cancel-text="取消"
                ok-text="保存"
        >
            <h3>{{assignUsername}} - {{assignNickName}}</h3>
            <a-transfer
                    :data-source="roleList"
                    :titles="['可分配', '未分配']"
                    :target-keys="targetRoles"
                    :selected-keys="selectedRoles"
                    :render="item=>item.title"
                    show-search
                    @change="handleChange"
                    @select-change="handleSelectChange"
            >
            </a-transfer>
        </a-modal>
    </a-card>
</template>

<script>
    let API = null;
    let ROLE_API = null;
    module.exports = {
        data: function () {
            return {
                columns: [
                    {
                        title: '用户名',
                        dataIndex: 'username',
                        key: 'username'
                    },
                    {
                        title: '状态',
                        dataIndex: 'extData.userStatus',
                        key: 'userStatus',
                        scopedSlots: {customRender: 'userStatus'},
                    },
                    {
                        title: '昵称',
                        dataIndex: 'nickName',
                        key: 'nickName'
                    },
                    {
                        title: '邮箱',
                        dataIndex: 'email',
                        key: 'email'
                    },
                    {
                        title: '手机号',
                        dataIndex: 'mobile',
                        key: 'mobile'
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createdTime',
                        key: 'createdTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        fixed: 'right',
                        scopedSlots: {customRender: 'action'},
                    },
                ],
                userStatuses: [],
                queryParam: {},
                pageParam: {},
                dataList: [],
                loading: false,
                editVisible: false,
                editLoading: false,
                editObj: {},
                /*** 分配角色 */
                assignVisible: false,
                assignUsername: '',
                assignNickName: '',
                assignLoading: false,
                roleList: [],
                targetRoles: [],
                selectedRoles: [],
                assignedRoleList: [],
            };
        },
        methods: {
            /*** 页面初始化 */
            toPage: function () {
                this.API.toPage().then(res => {
                    this.userStatuses = res.data.userStatuses;
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
                if (id == null || id === undefined) {
                    return;
                }
                this.editVisible = true;
                this.editObj = {};
                this.editObj.id = id;
                this.API.detail(id).then(res => {
                    this.editObj = res.data;
                });
            },
            /*** 关闭编辑框 */
            editHide: function () {
                this.editObj = {};
                this.editVisible = false;
            },
            /*** 新增&编辑 */
            saveOrUpdate: function () {
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
                if (id == null || id === undefined) {
                    return;
                }
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
            /*** 重置密码 */
            resetPwd: function (id) {
                if (id == null || id === undefined) {
                    return;
                }
                let that = this;
                this.$confirm({
                    title: '确认重置密码?',
                    content: '重置后密码将与用户名一致',
                    onOk() {
                        that.API.resetPwd(id).then(() => {
                            that.$message.success('重置密码成功');
                        });
                    }
                });
            },
            /*** 分配角色 */
            assignRoleShow: function (record) {
                if (record == null || record === undefined) {
                    return;
                }
                let id = record.id;
                this.assignUsername = record.username;
                this.assignNickName = record.nickName;
                this.assignVisible = true;
                this.ROLE_API.list().then(res => {
                    let data = res.data;
                    if (data != null && data.length > 0) {
                        for (let i in data) {
                            let item = {
                                key: data[i].id,
                                title: data[i].roleName,
                                description: data[i].remark,
                                disabled: false
                            };
                            this.roleList.push(item);
                        }
                    }
                });
            },
            /*** 关闭分配框 */
            assignHide: function () {
                this.assignVisible = false;
                this.assignUsername = '';
                this.assignNickName = '';
                this.roleList = [];
                this.targetRoles = [];
                this.selectedRoles = [];
                this.assignedRoleList = [];
            },
            handleChange: function(nextTargetKeys, direction, moveKeys) {
                this.targetRoles = nextTargetKeys;
            },
            handleSelectChange: function (sourceSelectedKeys, targetSelectedKeys) {
                this.selectedRoles = [...sourceSelectedKeys, ...targetSelectedKeys];
            },
            saveAssign: function () {
                console.log(this.targetRoles)
            }
        },
        mounted: function () {
            let that = this;
            seajs.use(['~/upms/api/user', '~/upms/api/role'], function (api, roleApi) {
                that.API = api;
                that.ROLE_API = roleApi;
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
