<template>
  <div>
    <Card>
      <p slot="title">用户管理</p>
      <div class="sear">
        <Form :model="formItem" :label-width="80" inline>
          <FormItem label="用户地址：">
            <Input v-model="formItem.address" placeholder="请输入用户地址" style="width:300px"></Input>
          </FormItem>
        </Form>
        <div class="btn">
          <Button type="primary" @click="search">
            <Icon type="ios-search" style="font-size:16px" />查询</Button>
          <Button type="default" style="margin-left:10px" @click="clear">
            <Icon type="ios-undo" style="font-size:16px" />重置</Button>
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
import { getList, changeStatu } from "@/service/userMgtApi/api";
export default {
  data() {
    return {
      isDelModal: false,
      showMsg: "",
      total: 0,
      page: 1,
      limit: 10,
      error: false,
      repeatMsg: "",
      formItem: {
        address: ""
      },
      id: "",
      tableData: [],
      tableColumns: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "用户昵称",
          key: "nickName"
        },
        {
          title: "用户地址",
          key: "address"
        },
        {
          title: "用户星级",
          key: "userLevel",
          render: (h, params) => {
            let txt = params.row.userLevel + "星";
            return h("span", {}, txt);
          }
        },
        {
          title: "用户状态",
          render: (h, params) => {
            let txt = params.row.userStatus == 0 ? "禁用" : "可用",
              cor = params.row.userStatus == 0 ? "error" : "primary";
            let userstatu = params.row.userStatus == 0 ? 1 : 0;
            return h(
              "Button",
              {
                props: {
                  type: cor
                },
                on: {
                  click: () => {
                    this.changeStatus(params.row.id, userstatu);
                  }
                }
              },
              txt
            );
          }
        }
      ]
    };
  },
  created() {
    this.getTableData();
  },
  activated() {},
  methods: {
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
        address: this.formItem.address
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
