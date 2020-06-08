<template>
  <div>
    <Card>
      <p slot="title">发送通知</p>
      <div class="tableHead">
      <div>数据列表</div>
    </div>
    <Table :columns="tableColumns" :data="tableData" border></Table>
    <Page :total="total" :current="page" :page-size="limit" show-total @on-change="onPageChange" />
    <Modal v-model="addModal" :title="changeTitle" :closable="false">
      <Form ref="formValidate" :model="formValidate" :label-width="120" :rules="ruleValidate">
        <FormItem label="公告标题:" prop="title">
          <Input v-model="formValidate.title"></Input>
        </FormItem>
        <FormItem label="公告内容:" prop="content">
          <Input v-model="formValidate.content" type="textarea"></Input>
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
  getList,
  getInfo,
  updateInfo,
  addInfo,
  delInfo
} from "@/service/newsApi/api";
export default {
  data() {
    return {
      total: 0,
      page: 1,
      limit: 10,
      changeTitle: "",
      changeType: "",
      addModal: false,
      isShowDelModal: false,
      formValidate: {
        id: "",
        title: "",
        content: ""
      },
      isShowDelModal: false,
      ruleValidate: {
        title: [
          { required: true, message: "公告标题不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "公告内容不能为空", trigger: "blur" }
        ]
      },
      tableData: [],
      tableColumns: [
        {
          title: "公告标题",
          key: "title"
        },
        {
          title: "公告内容",
          key: "content",
          render: (h,params)=>{
            let txt =  String(params.row.content).substring(0, 4) + "...";
            return h('span',{
               domProps:{
                title:params.row.content
              }
            },txt)
          }
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "操作",
          render: (h, params) => {
            console.log(params.row);
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
                      const { id, title, content } = params.row;
                      this.formValidate = {
                        id,
                        title,
                        content
                      };
                      console.log(this.formValidate);
                      this.addModal = true;
                      this.changeTitle = "编辑";
                      this.changeType = "editor";
                    }
                  }
                },
                "编辑"
              ),
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
      ]
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    onPageChange(page) {
      this.page = page;
      this.getTableData();
    },
    del(id) {
      console.log(id);
      delInfo(id).then(res => {
        if (res.code == 0) {
          this.isShowDelModal = false;
          this.$Message.success(res.message);
          this.getTableData();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    search() {
      this.page = 1;
      this.getTableData();
    },
    add() {
      this.addModal = true;
      this.changeTitle = "添加";
      this.changeType = "add";
    },
    cancel() {
      this.addModal = false;
      this.resetForm();
    },
    sure() {
      console.log(this.formValidate);
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          if (this.changeType == "add") {
            this.roleadd();
          } else {
            this.roleeditor();
          }
        }
      });
    },
    roleadd() {
      addInfo({
        title: this.formValidate.title,
        content: this.formValidate.content
      }).then(res => {
        if (res.code == 0) {
          this.cancel();
          this.getTableData();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    roleeditor() {
      updateInfo({
        ...this.formValidate
      }).then(res => {
        if (res.code == 0) {
          this.cancel();
          this.getTableData();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    resetForm() {
      for (let key in this.formValidate) {
        this.formValidate[key] = "";
      }
    },
    getTableData() {
      getList({
        pageNum: this.page,
        pageSize: this.limit
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
