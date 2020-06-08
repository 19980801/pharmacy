<template>
  <div class="content">
    <Card>
      <p slot="title">新增课程</p>
      <div class="form">
        <Form :model="addForm" :label-width="100" :rules="ruleInline">
          <FormItem label="课程标题：" prop="courseTitle">
            <Input v-model="addForm.courseTitle" placeholder="请输入课程标题"></Input>
          </FormItem>
          <FormItem label="课程分类：" prop="courseCategoryId">
            <Select v-model="addForm.courseCategoryId">
              <Option
                v-for="(item,i) of typeList"
                :key="i"
                :value="toString(item.id)"
              >{{item.categoryName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="全部内容：">
            <CheckboxGroup v-model="addForm.content" prop="content">
              <Checkbox :label="item.name" v-for="(item,index) in contentList" :key="index"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="用户分类：" prop="userClassChecked">
            <CheckboxGroup v-model="addForm.userClassChecked">
              <Checkbox :label="item.name" v-for="(item,index) in userClass" :key="index"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="课程视频:" prop="goodsPic">
            <Upload
              :action="uploadUrl"
              multiple
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
            >
              <Button type="ghost" icon="ios-cloud-upload-outline">上传视频</Button>
            </Upload>
          </FormItem>
          <FormItem label="收费：">
            <RadioGroup v-model="addForm.price">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="价格：" v-if="addForm.price!=='否'">
            <Input v-model="addForm.coursePrice" placeholder="请输入价格"></Input>
          </FormItem>
          <FormItem label="会员专属：" prop>
            <RadioGroup v-model="addForm.vip">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="课程状态：">
            <RadioGroup v-model="addForm.courseStatus">
              <Radio label="上架" value="0"></Radio>
              <Radio label="下架" value="1"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="课程信息：">
            <smeditor :config="config" ref="smeditor" @isUploading="ifUploading"></smeditor>
          </FormItem>
        </Form>
      </div>
      <Button type="primary" class="submit">提交</Button>
    </Card>
  </div>
</template>

<script>
import smeditor from "@/SMEditor/SMEditor.vue";
import { BASICURL, getCoursetypeList } from "@/service/getData";
import { getStore, removeStore, setStore } from "@/config/storage";
export default {
  data() {
    return {
      config: {
        uploadUrl: `${BASICURL}/admin/common/upload/oss/image`,
        uploadName: "file",
        parentName: "helpManage",
        uploadParams: {},
        uploadCallback: data => {
          this.uploading = false;
          if (!data.code) {
            this.$Message.success("上传成功!");
            return data.data;
          } else {
            this.$Message.error("上传失败!");
          }
        },
        uploadFailed: err => {
          console.log(err);
          this.uploading = false;
          this.$Message.error("上传失败!");
        }
      },
      contentList: [
        { name: "高血压" },
        { name: "糖尿病" },
        { name: "特殊人群用药" },
        { name: "中药" },
        { name: "注射剂" },
        { name: "处方审核" }
      ], //内容list
      contentChecked: [], //选中
      // uploadUrl: `${BASICURL}/admin/common/upload/oss/image`,
      uploadUrl: `http://oss-cn-beijing.aliyuncs.com`,
      uploadData: {},
      userClass: [{ name: "院内职工" }, { name: "实习生" }, { name: "进修生" }], //用户分类list
      userClassChecked: [],
      addForm: {
        userId: "",
        address: "",
        startTime: "",
        endTime: ""
      },
      typeList: [],
      ruleInline: {
        courseTitle: [
          { required: true, message: "课程标题不能为空", trigger: "blur" }
        ],
        courseCategoryId: [
          { required: true, message: "课程分类不能为空", trigger: "change" }
        ],
        courseCategoryId: [
          { required: true, message: "课程分类不能为空", trigger: "change" }
        ]
      },
      imgUploadLoading: false
    };
  },
  created() {
    removeStore("smeditor");
    this.getType();
  },
  methods: {
    beforeUpload(res) {
      console.log(res);
      this.imgUploadLoading = true;
    },
    handleSuccess(res) {
      this.imgUploadLoading = false;
      this.formValidate.cgLogo = res.object || "";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "上传的文件格式是错误的，请选择jpg或者png格式的图片"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "上传图片过大，最大不超过50kb."
      });
    },
    //获取所有课程分类
    getType() {
      getCoursetypeList().then(res => {
        if (res.code == 0) {
            console.log(res);
          this.typeList = res.data;
        }
      });
    },
    upload() {
      this.$refs.smeditor.$emit("saveInner");
      let uploadObj = {
        title: this.title,
        sysHelpClassification: 1,
        status: this.status,
        isTop: this.isTop,
        content: getStore("smeditor")
      };
      let fn = null;
      if (this.ifAdd) fn = addHelpManage;
      else {
        uploadObj.id = this.queryDetailId;
        uploadObj.createTime = this.createTime;
        fn = updateHelpManage;
      }
      if (
        this.title === "" ||
        this.title === null ||
        // this.klass === "" ||
        // this.klass === null ||
        getStore("smeditor") === "" ||
        getStore("smeditor") === null
      ) {
        this.$Message.warning("请完善信息！");
      } else {
        fn(uploadObj).then(res => {
          if (!res.code) {
            this.$Message.success("操作成功!");
            this.$router.push("/content/helpManage");
            removeStore("smeditor");
          } else this.$Message.error("异常错误!");
        });
      }
    },
    ifUploading(val) {
      this.uploading = val;
    }
  },
  components: {
    smeditor
  }
};
</script>

<style lang="less" scoped>
/deep/ .ivu-input {
  width: 300px;
}
/deep/ .ivu-select {
  width: 300px;
}
.submit {
  width: 300px;
  margin-left:100px;
}
</style>
