<template>
  <div>
    <Card>
      <p slot="title">新增题库</p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100" :rules="ruleValidate">
          <FormItem label="题库标题：" prop="questionTitle">
            <Input v-model="formValidate.questionTitle" placeholder="请输入题库标题"></Input>
          </FormItem>
          <FormItem label="用户分类：" prop="userType">
            <CheckboxGroup v-model="formValidate.userType">
              <Checkbox :label="item.id" v-for="(item,index) in userType" :key="index">{{item.categoryName}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="全部分类：" prop="allType">
            <CheckboxGroup v-model="formValidate.allType">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="全部内容：" prop="allContent">
            <CheckboxGroup v-model="formValidate.allContent">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div class="search">
            <FormItem label="题目标题：" prop="subjectTitle">
              <Input v-model="formValidate.subjectTitle" placeholder="请输入课程标题"></Input>
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
    <!-- 弹框 -->
    <Modal v-model="addModal" title="新增题目" :closable="false">
      <Form ref="addValidate" :model="addValidate" :label-width="90" :rules="ruleddValidate">
        <FormItem label="题目标题：" prop="title">
          <Input v-model="addValidate.title"></Input>
        </FormItem>
        <FormItem label="题型分类：" prop="type">
          <CheckboxGroup v-model="addValidate.typeList">
            <Checkbox :label="item.name" v-for="(item,index) in typeList" :key="index"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="答案选项：" v-for="(item,i) in options" :key="i">
          <div class="optionsLine">
            <Input v-model="item.value"></Input>
            <Button type="error" @click="delOption(i)">删除</Button>
          </div>
          <div>
            <RadioGroup v-model="item.isTrue">
              <Radio label="0">错误</Radio>
              <Radio label="1">正确</Radio>
            </RadioGroup>
          </div>
        </FormItem>
        <Button type="primary" @click="addOption" class="addoption">添加选项</Button>
      </Form>
      <div slot="footer">
        <Button type="default" @click="addModal=false">取消</Button>
        <Button type="primary" @click="sure">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { BASICURL,getUserClass} from "@/service/getData";
export default {
  data() {
    return {
      uploadUrl: `${this.host}/admin/upload/file`, //服务器
      uploadData: {
        type: ""
      },
      imgUploadLoading: false,
      total: 0,
      page: 1,
      limit: 10,
      addModal: false,
      formValidate: {
        questionTitle: "",
        userType: [],
        allType: [],
        allContent: [],
        subjectTitle: ""
      },
      ruleValidate: {
        questionTitle: [
          { required: true, message: "题库标题不能为空", trigger: "blur" }
        ],
        userType: [
          {
            required: true,
            message: "用户分类不能为空",
            trigger: "change",
            type: "array"
          }
        ],
        allType: [
          {
            required: true,
            message: "全部分类不能为空",
            trigger: "change",
            type: "array"
          }
        ],
        allContent: [
          {
            required: true,
            message: "全部内容不能为空",
            trigger: "change",
            type: "array"
          }
        ],
        subjectTitle: [
          { required: true, message: "题目标题不能为空", trigger: "blur" }
        ]
      },
      tableData: [],
      tableColumns: [
        {
          type: "selection",
          algin: "center",
          width: 80
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
          key: "contractGoldPercent"
        },
        {
          title: "创建人",
          key: "contractDate"
        }
      ],
      addValidate: {
        title: "",
        type: "",
        optionList: []
      },
      options: [
        { value: "", isTrue:"0"},
        { value: "", isTrue:"0"},
        { value: "", isTrue:"0"},
        { value: "", isTrue:"0"},
      ],
      ruleddValidate: {
        title: [
          { required: true, message: "题目标题不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "题目分类不能为空", trigger: "change" }
        ]
        // optionList:[
        //   { required: true, message: "答案选项不能为空", trigger: "change",type:"array"}
        // ]
      },
      typeList: [
        { name: "心血管" },
        { name: "糖尿病" },
        { name: "特殊人群用药" }
      ],
      optionList: [],
      userType:[]
    };
  },
  created() {
    this.getUserType();
  },
  methods: {
    getUserType(){
      getUserClass().then(res=>{
        console.log(res);
        if(res.code==0){
          this.userType=res.data;
        }
      })
    },
    addOption() {
      this.options.push({
        value: "",
        isTrue:"0"
      });
    },
    delOption(i){
      if(this.options.length>4){
        this.options.splice(i,1);
      }else{
        this.$Message.error("不能少于4个选项!");
      }
    },
    add() {
      this.addModal = true;
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
    cancel() {
      this.addModal = false;
      this.resetForm();
    },
    sure() {
      console.log(this.options);
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
  display: flex;
  height: 32px;
  margin: 0 0 10px;
  .button {
    margin: 0 20px;
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
.addoption {
  margin: 0 180px;
}
.optionsLine {
  display: flex;
}
</style>
