<template>
  <div>
    <Card>
      <p slot="title">新增题库</p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100" :rules="ruleValidate">
          <FormItem label="题库标题:" prop="contractTitle">
            <Input v-model="formValidate.contractTitle" placeholder="请输入题库标题"></Input>
          </FormItem>
          <FormItem label="用户分类：" prop="contractTitle">
            <CheckboxGroup v-model="formValidate.checkbox">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="全部分类：" prop="contractTitle">
            <CheckboxGroup v-model="formValidate.checkbox">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="全部内容：" prop="contractTitle">
            <CheckboxGroup v-model="formValidate.checkbox">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div class="search">
          <FormItem label="题目标题：" prop="contractPrice">
            <Input v-model="formValidate.contractPrice" placeholder="请输入课程标题"></Input>
          </FormItem>
          <Button type="primary" @click="search" class="button">
            <Icon type="ios-search" style="font-size:16px" />搜索
          </Button>
          <Button type="primary" @click="add">新增题目</Button>
          </div>
          <Table :columns="tableColumns" :data="tableData" border></Table>
          <Page
            :total="total"
            :current="page"
            :page-size="limit"
            show-total
            @on-change="onPageChange"
          />
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
import {
  getList,
  getContract,
  editContract,
  addContract
} from "@/service/questionApi/api";
export default {
  data() {
    const percent = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("预约金百分比不能为空"));
      } else if (!/^[1-9]\d?(\.\d+)?$|^0\.\d*[1-9]\d*$/.test(value)) {
        callback(new Error("只能输入1-100之间的数字"));
      } else {
        callback();
      }
    };
    return {
      uploadUrl: `${this.host}/admin/upload/file`, //服务器
      uploadData: {
        type: ""
      },
      imgUploadLoading: false,
      total: 0,
      page: 1,
      limit: 10,
      changeTitle: "",
      changeType: "",
      addModal: false,
      showMsg: "",
      formValidate: {
        contractTitle: "",
        contractImg: "",
        contractPrice: null,
        contractSubscriptionPercent: null,
        contractGoldPercent: null,
        contractDate: null,
        contractAdded: null,
        contractStatus: ""
      },
      ruleValidate: {
        contractTitle: [
          { required: true, message: "合约标题不能为空", trigger: "blur" }
        ],
        contractImg: [
          { required: true, message: "合约图片不能为空", trigger: "blur" }
        ],
        contractPrice: [
          {
            required: true,
            message: "合约价值不能为空且只能为数字",
            trigger: "blur",
            type: "number"
          }
        ],
        contractSubscriptionPercent: [
          {
            required: true,
            message: "预约金百分比不能为空",
            trigger: "blur",
            type: "number"
          },
          { validator: percent, trigger: "blur" }
        ],
        contractGoldPercent: [
          {
            required: true,
            message: "合约金百分比不能为空且只能为数字",
            trigger: "blur",
            type: "number"
          }
        ],
        contractDate: [
          {
            required: true,
            message: "合约有限期不能为空且只能为数字",
            trigger: "blur",
            type: "number"
          }
        ],
        contractAdded: [
          {
            required: true,
            message: "合约增值每日百分比不能为空且只能为数字",
            trigger: "blur",
            type: "number"
          }
        ],
        contractStatus: [
          { required: true, message: "合约状态不能为空", trigger: "change" }
        ]
      },
      tableData: [],
      tableColumns: [
        {
          type: 'selection',
          width:80,
        },
        {
          title: "题目标题",
          key: "contractNum"
        },
        {
          title: "类型",
          key: "contractTitle"
        },
        {
          title: "分值",
          key: "contractPrice"
        },
        {
          title: "分类",
          key: "contractSubscriptionPercent"
        },
        {
          title: "创建时间",
          key: "contractGoldPercent",
        },
        {
          title: "创建人",
          key: "contractDate"
        }
      ]
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    add(){},
    // 根据预约金百分百算合约金百分百
    getContractGoldPercent() {
      this.formValidate.contractGoldPercent =
        100 - this.formValidate.contractSubscriptionPercent;
    },
    onBeforeImgUploading() {
      this.imgUploadLoading = true;
    },
    onImgUploadInforSuccess(res) {
      this.imgUploadLoading = false;
      this.formValidate.contractImg = res.message || "";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "上传的文件格式是错误的，请选择jpg或者png格式的图片"
      });
    },
    onPageChange(page) {
      this.page = page;
      this.getTableData();
    },
    search() {
      this.page = 1;
      this.getTableData();
      this.formIte = {};
    },
    courseTeacher(e) {
      console.log(e);
      if (e) {
        this.formValidate.clCourseTeacherName = e.label;
      }
    },
    classTeacher(e) {
      console.log(e);
      if (e) {
        this.formValidate.clClassTeacherName = e.label;
      }
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
      addContract({
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
    roleeditor() {
      editContract({
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
      getList().then(res => {
        console.log(res);
        this.tableData = res.data;
        this.total = res.data.length;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  display:flex;
  height:32px;
  margin:0 0 10px;
  .button{
    margin:0 20px;
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
/deep/ .ivu-input {
  width: 300px;
}
</style>
