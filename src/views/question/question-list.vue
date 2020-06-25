<template>
    <div>
        <Card>
            <p slot="title">题库列表</p>
            <div class="sear">
                <Form :model="formItem" :label-width="100" inline>
                    <FormItem label="题库标题：" class="searchInput">
                        <Input v-model="formItem.bankTitle" placeholder="请输入题库标题"></Input>
                    </FormItem>
                </Form>
                <div class="btn">
                    <Button type="primary" @click="search">
                        <Icon type="ios-search" style="font-size:16px" />查询
                    </Button>
                    <Button type="default" style="margin-left:10px" @click="clear">
                        <Icon type="ios-undo" style="font-size:16px" />重置
                    </Button>
                </div>
            </div>
            <div class="tableHead">
                <div style="font-weight:700;">数据列表</div>
            </div>
            <Table :columns="tableColumns" :data="tableData" border></Table>
            <Page :total="total" :current="page" :page-size="limit" show-total @on-change="onPageChange" />
        </Card>
    </div>
</template>

<script>
import { getList, getUserClass } from "@/service/questionApi/api";
export default {
    data() {
        return {
            userList:[],
            editModal: false,
            total: 0,
            page: 1,
            limit: 10,
            error: false,
            formItem: {
                bankTitle: ""
            },
            typeList: [],
            tableData: [],
            tableColumns: [
                {
                    title: "题库标题",
                    key: "bankTitle"
                },
                {
                    title: "题目数量",
                    key: "subjectNum"
                },
                {
                    title: "题库分类",
                    key: "userType",
                    render:(h,params)=>{
                        let txt="";
                        this.userList.forEach(ele=>{
                            if(ele.id==params.row.userType){
                                txt=ele.categoryName
                            }
                        })
                        return h("span", {}, txt);
                    }
                },
                {
                    title: "创建时间",
                    key: "createTime"
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        return [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary"
                                    },
                                    style: {
                                        marginRight: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row);
                                            const {
                                                id,
                                                value,
                                                name
                                            } = params.row;
                                            this.formValidate = { id, value };
                                            this.modalTitle = name;
                                            this.addModal = true;
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary"
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row);
                                            const {
                                                name,
                                                phone,
                                                sex,
                                                type
                                            } = params.row;
                                            this.formValidate = {
                                                name,
                                                phone,
                                                sex,
                                                type
                                            };
                                            this.modalTitle = "编辑";
                                            this.addModal = true;
                                        }
                                    }
                                },
                                "下架"
                            )
                        ];
                    }
                }
            ]
        };
    },
    created() {
        this.getUserList();
        this.getTableData();
    },
    methods: {
        getUserList() {
            getUserClass().then(res => {
                if (res.code == 0) {
                    this.userList=res.data;
                }
            });
        },
        changeStatus(id, status) {
            changeStatu(id, status).then(res => {
                if (res.code == 0) {
                    this.$Message.success(res.message);
                    this.getTableData();
                } else {
                    this.$Message.error(res.message);
                }
            });
        },
        onPageChange(page) {
            this.page = page;
            this.getTableData();
        },
        search() {
            this.page = 1;
            this.getTableData();
        },
        clear() {
            for (let key in this.formItem) {
                this.formItem[key] = "";
            }
            this.getTableData();
        },
        getTableData() {
            getList({
                pageNum: this.page,
                pageSize: this.limit,
                bankTitle: this.formItem.bankTitle
            }).then(res => {
                console.log(res);
                this.tableData = res.data.content;
                this.total = res.data.totalElements;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.sear {
    display: flex;
    .searchInput {
        width: 300px;
    }
    .btn {
        margin-left: 100px;
        button:nth-child(2) {
            margin-left: 10px;
        }
    }
}
.ivu-page {
    margin-top: 10px;
    text-align: right;
}
.tableHead {
    width: 100%;
    height: 50px;
    padding: 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
