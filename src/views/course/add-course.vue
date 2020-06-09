<template>
  <div class="content">
    <Card>
      <p slot="title">新增课程</p>
      <div class="form">
        <Form :model="addForm" :label-width="100" :rules="ruleInline">
          <FormItem label="课程标题：" prop="courseTitle">
            <Input v-model="addForm.courseTitle" placeholder="请输入课程标题"></Input>
          </FormItem>
          <FormItem label="课程分类：" prop="courseType">
            <Select v-model="addForm.courseType">
              <Option
                v-for="(item,i) of typeList"
                :key="i"
                :value="toString(item.id)"
              >{{item.categoryName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="全部内容：" prop="content">
            <CheckboxGroup v-model="addForm.content">
              <Checkbox :label="item.id" v-for="(item,index) in contentList" :key="index">{{item.name}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="用户分类：" prop="userType">
            <CheckboxGroup v-model="addForm.userType">
              <Checkbox :label="item.id" v-for="(item,index) in userTypeList" :key="index">{{item.categoryName}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="课程视频:" prop="courseVideos">
            <Upload
              :action="uploadUrl"
              multiple
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
            >
              <Button type="ghost" icon="ios-cloud-upload-outline">上传视频</Button>
            </Upload>
          </FormItem>
          <div>

          </div>
          <FormItem label="收费：" prop="price">
            <RadioGroup v-model="addForm.price">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="价格：">
            <Input v-model="addForm.coursePrice" placeholder="请输入价格" :disabled="addForm.price==1"></Input>
          </FormItem>
          <FormItem label="会员专属：" prop="vip">
            <RadioGroup v-model="addForm.vip">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="课程状态：" prop="courseStatus">
            <RadioGroup v-model="addForm.courseStatus">
              <Radio label="0">上架</Radio>
              <Radio label="1">下架</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="课程信息：">
            <smeditor :config="config" ref="smeditor" @isUploading="ifUploading"></smeditor>
          </FormItem>
        </Form>
      </div>
      <Button type="primary" class="submit" @click="addCourse">提交</Button>
    </Card>
  </div>
</template>

<script>
import smeditor from "@/SMEditor/SMEditor.vue";
import { BASICURL, getCoursetypeList, getUserClass } from "@/service/getData";
import { getStore, removeStore, setStore } from "@/config/storage";
export default {
  data() {
    return {
      config: {
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
      uploadUrl: `http://oss-cn-beijing.aliyuncs.com`,
      uploadData: {},
      contentList: [
        { name: "高血压" },
        { name: "糖尿病" },
        { name: "特殊人群用药" },
        { name: "中药" },
        { name: "注射剂" },
        { name: "处方审核" }
      ],
      userTypeList: [],
      addForm: {
        courseTitle: "",
        courseType: "",
        content: [],
        userType:[],
        courseVideos:[],
        price:"0",
        coursePrice:"",
        vip:"0",
        courseStatus:"0"
      },
      typeList: [],
      ruleInline: {
        courseTitle: [
          { required: true, message: "课程标题不能为空", trigger: "blur" }
        ],
        courseType: [
          { required: true, message: "课程分类不能为空", trigger: "change" }
        ],
        content: [
          { required: true, message: "全部内容不能为空", trigger: "change",type: 'array'}
        ],
        userType: [
          { required: true, message: "用户分类不能为空", trigger: "change",type: 'array'}
        ],
        courseVideos:[
          { required: true, message: "课程视频不能为空", trigger: "blur" }
        ],
        price:[
          { required: true, message: "是否收费不能为空", trigger: "change" }
        ],
        vip:[
          { required: true, message: "会员专属不能为空", trigger: "change" }
        ],
        courseStatus:[
          { required: true, message: "课程状态不能为空", trigger: "change" }
        ]
      },
      imgUploadLoading: false
    };
  },
  created() {
    removeStore("smeditor");
    this.getType();
    this.getUserList();
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
          this.typeList = res.data;
        }
      });
    },
    // 获取用户分类
    getUserList() {
      getUserClass().then(res => {
        if(res.code==0){
          console.log(res);
          this.userTypeList=res.data;
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
      if (getStore("smeditor") === "" || getStore("smeditor") === null) {
        this.$Message.warning("请完善信息！");
      } else {
        fn(uploadObj).then(res => {
          if (!res.code) {
            this.$Message.success("操作成功!");
            // this.$router.push("/content/helpManage");
            removeStore("smeditor");
          } else this.$Message.error("异常错误!");
        });
      }
    },
    ifUploading(val) {
      this.uploading = val;
    },
    addCourse(){
      console.log(this.addForm.price);
      console.log(this.addForm.userType);
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
  margin-left: 100px;
}
</style>
