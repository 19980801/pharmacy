<template>
  <div>
    <Card>
      <p slot="title">查询合约</p>
      <div class="tableHead">
        <div>数据列表</div>
        <div>
          <Button type="primary" @click="add">添加</Button>
        </div>
      </div>
      <Table :columns="tableColumns" :data="tableData" border></Table>
      <Page :total="total" :current="page" :page-size="limit" show-total @on-change="onPageChange" />
      <Modal v-model="addModal" :title="changeTitle" :closable="false">
        <Form ref="formValidate" :model="formValidate" :label-width="145" :rules="ruleValidate">
          <FormItem label="合约标题:" prop="contractTitle">
            <Input v-model="formValidate.contractTitle" placeholder="请输入合约标题"></Input>
          </FormItem>
          <FormItem label="合约图片:" prop="contractImg">
            <Input v-model="formValidate.contractImg" placeholder="只能上传一张jpg/png格式文件">
            <span slot="append">
              <Upload :action="uploadUrl" :format="['jpg','jpeg','png']" :data="uploadData" :show-upload-list="false" :before-upload="onBeforeImgUploading" :on-success="onImgUploadInforSuccess" :on-format-error="handleFormatError">
                <Button icon="ios-cloud-upload-outline" :loading="imgUploadLoading">选择上传文件</Button>
              </Upload>
            </span>
            </Input>
          </FormItem>
          <FormItem label="合约价值：" prop="contractPrice">
            <Input v-model="formValidate.contractPrice" placeholder="请输入合约价值（只能为数字）" :number="true">
            <span slot="append">ETH</span>
            </Input>
          </FormItem>
          <FormItem label="预约金百分比：" prop="contractSubscriptionPercent">
            <Input v-model="formValidate.contractSubscriptionPercent" :number="true" placeholder="请输入合约价值（0-100）" @on-blur="getContractGoldPercent">
            <span slot="append">%</span>
            </Input>
          </FormItem>
          <FormItem label="合约金百分比：" prop="contractGoldPercent">
            <Input v-model="formValidate.contractGoldPercent" disabled :number="true" disabled>
            <span slot="append">%</span>
            </Input>
          </FormItem>
          <FormItem label="合约有限期：" prop="contractDate">
            <Input v-model="formValidate.contractDate" placeholder="请输入合约有限期（只能为数字）" :number="true">
            <span slot="append">日</span>
            </Input>
          </FormItem>
          <FormItem label="合约增值每日百分比：" prop="contractAdded">
            <Input v-model="formValidate.contractAdded" :number="true" placeholder="请输入合约有限期（只能为数字）">
            <span slot="append">%</span>
            </Input>
          </FormItem>
          <FormItem label="合约状态：" prop="contractStatus">
            <RadioGroup v-model="formValidate.contractStatus" placeholder="请选择">
              <Radio label="0">上架</Radio>
              <Radio label="1">下架</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="default" @click="cancel">取消</Button>
          <Button type="primary" @click="sure">确定</Button>
        </div>
      </Modal>
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
      // uploadUrl: `http://192.168.31.204:6004/admin/upload/file`, //dpy
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
      isShowDelModal: false,
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
          { required: true, message: "预约金百分比不能为空", trigger: "blur", type: "number" },
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
          title: "合约编号",
          width: 180,
          key: "contractNum"
        },
        {
          title: "合约标题",
          key: "contractTitle"
        },
        {
          title: "合约价值",
          key: "contractPrice"
        },
        {
          title: "预约金百分比",
          key: "contractSubscriptionPercent",
          render: (h, params) => {
            return h("span", {}, params.row.contractSubscriptionPercent + "%");
          }
        },
        {
          title: "合约金百分比",
          key: "contractGoldPercent",
          render: (h, params) => {
            return h("span", {}, params.row.contractGoldPercent + "%");
          }
        },
        {
          title: "合约有限期",
          key: "contractDate",
          render: (h, params) => {
            return h("span", {}, params.row.contractDate + "日");
          }
        },
        {
          title: "增值百分比",
          key: "contractAdded",
          render: (h, params) => {
            return h("span", {}, params.row.contractAdded + "%");
          }
        },
        {
          title: "状态",
          key: "contractStatus",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.contractStatus == 0 ? "上架" : "下架"
            );
          }
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
                      const {
                        id,
                        contractImg,
                        contractTitle,
                        contractPrice,
                        contractSubscriptionPercent,
                        contractGoldPercent,
                        contractDate,
                        contractAdded,
                        contractStatus
                      } = params.row;
                      this.formValidate = {
                        id,
                        contractImg,
                        contractTitle,
                        contractPrice,
                        contractSubscriptionPercent:Number(contractSubscriptionPercent),
                        contractGoldPercent,
                        contractDate,
                        contractAdded: Number(contractAdded),
                        contractStatus: contractStatus.toString()
                      };
                      console.log(this.formValidate);
                      this.addModal = true;
                      this.changeTitle = "编辑";
                      this.changeType = "editor";
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
  methods: {
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
