<template>
  <div>
    <Card>
      <p slot="title">推荐关系查询</p>
      <div class="sear">
        <Input v-model="userId" placeholder="请输入用户ID" style="width:300px"></Input>
        <div class="btn">
          <Button type="primary" @click="search">
            <Icon type="ios-search" style="font-size:16px" />查询</Button>
          <Button type="default" style="margin-left:10px" @click="clear">
            <Icon type="ios-undo" style="font-size:16px" />重置</Button>
        </div>
      </div>
      <div class="tableHead">
        <div>数据列表</div>
      </div>
      <Table :columns="tableColumns" :data="tableData" border width></Table>
      <Page :total="total" :current="page" :page-size="limit" show-total @on-change="onPageChange" />
    </Card>

  </div>
</template>

<script>
import { getrecomment } from "@/service/userMgtApi/api";
export default {
  data() {
   
    return {
      userId: "",
      total: 0,
      page: 1,
      limit: 10,
      tableColumns: [
        {
          title: "用户ID",
          key: "userId"
        },
        {
          title: "用户昵称",
          key: "userNickName"
        },
        {
          title: "推荐人id",
          key: "recommendId"
        },
        {
          title: "创建时间",
         key:'createTime'
        },
        {
          title: "用户星级",
          key: "userLevel",
          render:(h,params)=>{
              return h("span",{},params.row.userLevel+'星')
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    this.getTableData();
  },
  activated() {},
  methods: {
    search() {
      this.page = 1;
      this.getTableData();
    },
    clear() {
      this.userId = "";
      this.getTableData();
    },

    onPageChange(page) {
      this.page = page;
      this.getTableData();
    },
    getTableData() {
      getrecomment({
        pageNum: this.page,
        pageSize: this.limit,
        userId: this.userId
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
.tableHead {
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-top: 20px;
  align-items: center;
}
.sear {
  display: flex;
  // justify-content: space-between;
  .btn {
    margin-left: 50px;
    margin-right: 100px;
    button:nth-child(2) {
      margin-left: 10px;
    }
    button:nth-child(3) {
      margin-left: 380px;
    }
  }
}
.ivu-page {
  margin-top: 10px;
  text-align: right;
}
.show {
  width: 600px;
  img {
    width: 100%;
  }
}
</style>
