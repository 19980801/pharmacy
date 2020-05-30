<template>
    <div>
        <Card>
            <p slot="title">
                意见反馈
                <Button type="primary" size="small" @click="refresh">
                    <Icon type="refresh"></Icon>刷新
                </Button>
            </p>

            <Row>
                <div class="search_wrapper">
                    用户账号:<Input placeholder="用户账号" v-model="filterSearch.mobile" /></Input>
                    <!-- 反馈起止时间:<DatePicker type="datetimerange" placeholder="反馈起止时间" style="width:300px;margin-right:20px" v-model="time"></DatePicker> -->
                    <Button type="primary" @click="searchByFilter">搜索</Button>
                    <Button type="default" @click="resetfilterSearch">重置</Button>
                </div>
            </Row>
            <Row>
                <div class="table_header">
                    <p>数据列表</p>
                </div>
            </Row>
            <Row>
                <Table :columns="columns_first" :data="content" :loading="ifLoading">
                </Table>
            </Row>

            <Row class="pageWrapper">
                <Page :total="totalElements" style='margin-top:8px' :current="current" @on-change="changePage" show-elevator></Page>
            </Row>
        </Card>
    </div>

</template>

<script>

import dtime from 'time-formater' 
import { getFeedData } from '@/service/getData';
import { setStore, getStore, removeStore } from '@/config/storage';
export default {
    data() {
        return {
            filterSearch: {//查询参数
                mobile: "",
                pageNo: 1,
                pageSize: 10,
                // startTime: "",
                // endTime: ""
            },
            time: [],
            totalElements: null,
            current: 1,
            ifLoading: true,
            columns_first: [
                {
                    title: "编号",
                    key: "id",
                },
                {
                    title: "用户账号",
                    key: "mobile",
                },
                {
                    title: "反馈内容",
                    key: "sugContent",
                    render: (h, params) => {
                        let title = params.row.sugContent;
                        return h("div", {
                            style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                wordBreak: "break-all",
                                boxSizing: "border-box",
                            },
                            domProps: {
                                title
                            }
                        }, title)
                    }
                },
                {
                    title: "反馈时间",
                    key: "createTime",
                }
            ],
            content: []
        };
    },
    methods: {
        searchByFilter() {
            // console.log(this.time);
            // if (this.time.length > 0 && this.time[0] instanceof Date) {
            //     this.filterSearch.startTime = dtime(this.time[0]).format('YYYY-MM-DD HH:mm:ss');
            //     this.filterSearch.endTime = dtime(this.time[1]).format('YYYY-MM-DD HH:mm:ss');
            // } else {
            //     this.filterSearch.startTime = "";
            //     this.filterSearch.endTime = "";
            // }
            this.filterSearch.pageNo = 1;
            this.current = 1;
            this.refreshPage(this.filterSearch);
        },
        refresh() {
            this.filterSearch.mobile = "";
            // this.time = "";
            this.current = 1;
            this.filterSearch.pageNo = 1;
            this.refreshPage(this.filterSearch);
        },
        resetfilterSearch() {
            this.filterSearch.mobile = "";
            this.refreshPage(this.filterSearch);
            // this.time = "";
        },
        changePage(pageIndex) {
            this.current = pageIndex;
            this.filterSearch.pageNo = pageIndex;
            this.refreshPage(this.filterSearch);
        },
        refreshPage(obj) {
            this.ifLoading = true;
            getFeedData(obj).then(res => {
                this.content = res.data.content;
                this.totalElements = res.data.totalElements;
                this.ifLoading = false;
            });
        },
    },
    created() {
        return this.refreshPage(this.filterSearch);
    }
}
</script>

<style lang="less" scoped>
.search_wrapper {
    margin-bottom: 30px;
    .ivu-input-wrapper {
        width: 200px;
        margin-right: 20px;
    }
}
.table_header {
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    background-color: #eee;
    border-radius: 5px 5px 0 0;
    p {
        font-weight: 700;
    }
}
.ivu-modal-confirm-head .ivu-modal-confirm-head-title {
    display: block;
    text-align: center;
}
</style>


