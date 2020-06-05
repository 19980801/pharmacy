<template>
  <div>
    <Card>
      <p slot="title">课程列表</p>
      <div class="sear">
        <Form :model="formItem" :label-width="100" inline>
          <FormItem label="课程标题：" class="searchInput">
            <Input v-model="formItem.title" placeholder="请输入课程标题"></Input>
          </FormItem>
          <FormItem label="是否收费：" class="searchInput">
            <Select v-model="formItem.type">
              <Option v-for="(item,i) in typeList" :key="i" :value="String(item.id)">{{item.name}}</Option>
            </Select>
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
import { getList, changeStatu } from "@/service/userMgtApi/api";
export default {
  data() {
    return {
      editModal: false,
      total: 0,
      page: 1,
      limit: 10,
      error: false,
      formItem: {
        title: "",
        type: ""
      },
      tableData: [],
      tableColumns: [
        {
          title: "课程名称",
          key: "nickName"
        },
        {
          title: "视频数",
          key: "nickName"
        },
        {
          title: "状态",
          key: "nickName"
        },
        {
          title: "创建时间",
          key: "address"
        },
        {
          title: "创建人",
          key: "address"
        },
        {
          title: "是否收费",
          key: "address"
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
                      const { id, value, name } = params.row;
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
                      const { name, phone, sex, type } = params.row;
                      this.formValidate = { name, phone, sex, type };
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
      ],
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
