<template>
  <div>
    <Card>
      <p slot="title">抢购合约批次管理</p>
      <div class="sear">
        <Form :model="formItem" :label-width="80" inline>
          <FormItem label="抢购时间：">
            <DatePicker type="date" placeholder="请选择抢购时间" style="width: 200px"  v-model="formItem.lootTime"></DatePicker>
            <!-- <Time-picker type="time" placeholder="请选择抢购时间" style="width:200px" v-model="formItem.lootTime"></Time-picker> -->
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
        <div>数据列表</div>
        <div>
          <Button type="primary" @click="addModal=true">添加</Button>
        </div>
      </div>
      <Table :columns="tableColumns" :data="tableData" border width></Table>
      <Page :total="total" :current="page" :page-size="limit" show-total @on-change="onPageChange" />
      <!-- 添加 -->
      <Modal v-model="addModal" title="添加" :closable="false">
        <Form ref="formValidate" :model="formValidate" :label-width="100" :rules="ruleValidate">
          <FormItem label="合约标题：" prop="contractTitle">
            <Select v-model="contractId" @on-change='contractchange($event)' :label-in-value="true">
              <Option v-for="(item,i) of list" :key="i" :value="item.id">{{item.contractTitle}}</Option>
            </Select>
          </FormItem>
          <FormItem label="合约编号：" prop="contractNum">
            <Input v-model="formValidate.contractNum" disabled></Input>
          </FormItem>
          <FormItem label="抢购时间：" prop="lootTime">
            <Time-picker type="time" placeholder="请选择抢购时间" style="width: 100%" v-model="formValidate.lootTime"></Time-picker>
          </FormItem>
          <FormItem label="抢购人数：" prop="lootNum">
            <Input v-model="formValidate.lootNum" placeholder="请输入抢购数量"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="default" @click="cancel">取消</Button>
          <Button type="primary" @click="sure">确定</Button>
        </div>
      </Modal>
      <!-- 删除 -->
      <Modal v-model="isShowDelModal" title="删除">
        <p>确定是否删除数据？</p>
        <div slot="footer" style="text-align: center">
          <Button type="error" @click="isShowDelModal = false" style="border-radius: none">取消</Button>
          <Button type="primary" @click="del(id)" style="border-radius: none">确定</Button>
        </div>
      </Modal>
    </Card>

  </div>
</template>

<script>
import {
  getBatchList,
  addBatch,
  getList,
  delBatch
} from "@/service/contractApi/api";
export default {
  data() {
    return {
      isShowDelModal: false,
      addModal: false,
      picModal: false,
      pic: "",
      total: 0,
      page: 1,
      limit: 10,
      formItem: {
        lootTime: ""
      },
      contractId:"",
      formValidate: {
        contractNum: "",
        contractTitle: "",
        lootTime: "",
        lootNum: ""
      },
      ruleValidate: {
        contractNum: [
          { required: true, message: "合约编号不能为空", trigger: "change" }
        ],
        contractTitle: [
          { required: true, message: "合约标题不能为空", trigger: "change" }
        ],
        lootTime: [
          { required: true,message:"抢购时间不能为空", trigger: 'change' }
        ],
        lootNum: [
          { required: true, message: "抢购数量不能为空", trigger: "change" },
          {
            type: "string",
            pattern: /^\d+$/,
            message: "请输入大于0的数字",
            trigger: "blur"
          }
        ]
      },
      tableColumns: [
        {
          title: "合约编号",
          key: "contractNum"
        },
        {
          title: "合约标题",
          key: "contractTitle"
        },
        {
          title: "抢购时间",
          key: "lootTime"
        },
        {
          title: "抢购人数",
          key: "lootNum"
        },
        {
          title: "操作",
          render: (h, params) => {
            return [
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  on: {
                    click: () => {
                      this.isShowDelModal = true;
                      this.id = params.row.id;
                    }
                  }
                },
                "删除"
              )
            ];
          }
        }
      ],
      tableData: [],
      list: []
    };
  },
  created() {
    this.getTableData();
    this.getContractNumList();
  },
  activated() {},
  methods: {
    contractchange(e){
      console.log(e);
      this.formValidate.contractTitle=e.label;
      this.list&&this.list.forEach(el=>{
        if(el.id==e.value){
          console.log(el);
          this.formValidate.contractNum = el.contractNum;
        }
      })
    },
    // 查询所有合约列表
    getContractNumList() {
      getList().then(res => {
        console.log(res);
        this.list = res.data;
      });
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
    cancel(){
      this.addModal=false;
      for(let key in this.formValidate){
        this.formValidate[key]='';
      }
    },
    del(id) {
      console.log(id);
      delBatch(id).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.isShowDelModal = false;
          this.$Message.success(res.message);
          this.getTableData();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    dateform(time) {
      console.log(time)
      var date = new Date(time);
      console.log(date)
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      // return h + ":" + minute + ":" + second;
        return y + "-" + m + "-" + d;
    },
    sure() {
      console.log(this.formValidate.lootTime);
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          addBatch({
            ...this.formValidate
          }).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$Message.success(res.message);
              this.cancel();
              this.getTableData();
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    onPageChange(page) {
      this.page = page;
      this.getTableData();
    },
    getTableData() {
      let time = this.formItem.lootTime;
      if (time) {
        time = this.dateform(time);
        console.log(time);
      } else {
        time = "";
      }
      getBatchList({
        pageNum: this.page,
        pageSize: this.limit,
        lootTime: time
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
  display: flex;
  justify-content: space-between;
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
