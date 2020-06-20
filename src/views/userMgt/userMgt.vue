<template>
  <div>
    <Card>
      <p slot="title">用户管理</p>
      <div class="sear">
        <Form :model="formItem" :label-width="100" inline>
          <FormItem label="用户名称：" class="searchInput">
            <Input v-model="formItem.name" placeholder="请输入用户名称"></Input>
          </FormItem>
          <FormItem label="用户分类：" class="searchInput">
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
        <Button type="primary" @click="add">
          <Icon type="plus-round"></Icon>添加
        </Button>
      </div>
      <Table :columns="tableColumns" :data="tableData" border></Table>
      <Page :total="total" :current="page" :page-size="limit" show-total @on-change="onPageChange" />
    </Card>
    <!-- 增加编辑弹框 -->
    <Modal v-model="addModal" :title="modalTitle" :closable="false">
      <Form ref="formValidate" :model="formValidate" :label-width="90" :rules="ruleValidate">
        <FormItem label="用户姓名：" prop="name">
          <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="手机号：" prop="phone">
          <Input v-model="formValidate.phone"></Input>
        </FormItem>
        <FormItem label="性别：" prop="sex">
            <RadioGroup v-model="formItem.sex">
                <Radio label="0">男</Radio>
                <Radio label="1">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="用户分类：" prop="type">
            <Select v-model="formItem.type">
              <Option v-for="(item,i) in typeList" :key="i" :value="String(item.id)">{{item.name}}</Option>
            </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" @click="addModal=false">取消</Button>
        <Button type="primary" @click="sure">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getList, changeStatu } from "@/service/userMgtApi/api";
export default {
  data() {
    return {
      addModal:false,
      isDelModal: false,
      modalTitle:"新增",
      showMsg: "",
      total: 0,
      page: 1,
      limit: 10,
      error: false,
      formItem: {
        name: "",
        type: ""
      },
      formValidate:{
        name:"",
        phone:"",
        sex:"",
        type:""
      },
      ruleValidate: {
        name: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur"}
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "change"}
        ],
        type: [
          { required: true, message: "性别不能为空", trigger: "change"}
        ],
      },
      typeList: [
        { id: 1, name: "院内职工" },
        { id: 2, name: "实习生" },
        { id: 3, name: "进修生" }
      ], //分类列表
      id: "",
      tableData: [],
      tableColumns: [
        {
          title: "用户名称",
          key: "nickName"
        },
        {
          title: "性别",
          key: "nickName"
        },
        {
          title: "分类",
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
                "禁用"
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
                      const {name,phone,sex,type} = params.row;
                      this.formValidate = {name,phone,sex,type};
                      this.modalTitle ="编辑";
                      this.addModal = true;
                    }
                  }
                },
                "编辑"
              )
            ];
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
    add() {
      this.addModal=true;
      this.modalTitle="新增";
    },
    sure(){},
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
    },
    
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
