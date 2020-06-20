<template>
    <div class="content">
        <Card>
            <p slot="title">新增课程</p>
            <div class="form">
                <Form ref="addForm" :model="addForm" :label-width="100" :rules="ruleInline">
                    <FormItem label="课程标题：" prop="courseTitle">
                        <Input v-model="addForm.courseTitle" placeholder="请输入课程标题"></Input>
                    </FormItem>
                    <FormItem label="封面图片：" prop="imgUrl" style="width:200px">
                        <Input v-model="addForm.imgUrl" placeholder="只能上传一张jpg/png格式文件">
                        <span slot="append">
                            <Upload :action="uploadImgUrl" :format="['jpg','jpeg','png']" :data="uploadData"
                                :show-upload-list="false" :before-upload="onBeforeImgUploading"
                                :on-success="onImgUploadInforSuccess" :on-format-error="handleImgFormatError">
                                <Button icon="ios-cloud-upload-outline" :loading="imgUploadLoading">选择上传文件</Button>
                            </Upload>
                        </span>
                        </Input>
                    </FormItem>
                    <FormItem label="课程分类：" prop="courseType">
                        <Select v-model="addForm.courseType" @on-change="showContent">
                            <Option v-for="(item,i) of typeList" :key="i" :value="(item.id)">
                                {{item.categoryName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="全部内容：" prop="content">
                        <CheckboxGroup v-model="addForm.content">
                            <Checkbox :label="item.id" v-for="(item,index) in allContent" :key="index">{{item.contentName}}
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="用户分类：" prop="userType">
                        <CheckboxGroup v-model="addForm.userType">
                            <Checkbox :label="item.id" v-for="(item,index) in userTypeList" :key="index">
                                {{item.categoryName}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="课程视频:" prop="courseVideos">
                        <Button type="primary" @click="addVideo=true">添加</Button>
                    </FormItem>
                    <div>
                        <div class="videoBox">
                            <div class="videoItem" v-for="(item,i) in addForm.courseVideos" :key="i">
                                <video :src="item.classUrl"></video>
                                <p>{{item.classTitle}}</p>
                                <Button type="error" class="delvideo" @click="delconfirm(i)">删除</Button>
                            </div>
                        </div>
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
        <Modal v-model="addVideo" title="上传视频">
            <Form ref="addValidate" :model="addValidate" :label-width="90" :rules="ruleddValidate">
                <FormItem label="视频标题：" prop="videoTitle">
                    <Input v-model="addValidate.videoTitle"></Input>
                </FormItem>
                <FormItem label="课程视频：" prop="video">
                    <Upload :action="uploadUrl" :format="['mp4']" :on-format-error="handleFormatError"
                        :before-upload="beforeUpload" :on-success="handleSuccess">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传视频</Button>
                    </Upload>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="default" @click="addVideo=false">取消</Button>
                <Button type="primary" :loading="videoloading" @click="sure">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import smeditor from "@/SMEditor/SMEditor.vue";
import {
    BASICURL,
    getCoursetypeList,
    getUserClass
} from "@/service/courseApi/api";
import { getStore, removeStore, setStore } from "@/config/storage";
export default {
    data() {
        return {
            config: {
                uploadUrl: `${this.host}/admin/upload/oss/image`,
                uploadName: "file",
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
            addVideo: false,
            uploadImgUrl:`${this.host}/admin/upload/oss/image`,
            uploadUrl: `${this.host}/admin/upload/oss/video`,
            uploadData: {},
            userTypeList: [],
            addForm: {
                courseTitle: "",
                imgUrl:"",
                courseType:null,
                content: [],
                userType: [],
                courseVideos: [],
                price: "0",
                coursePrice: "",
                vip: "0",
                courseStatus: "0"
            },
            typeList: [],
            allContent:[],      //全部内容
            ruleInline: {
                courseTitle: [
                    {
                        required: true,
                        message: "课程标题不能为空",
                        trigger: "blur"
                    }
                ],
                imgUrl: [
                    {
                        required: true,
                        message: "封面图片不能为空",
                        trigger: "blur"
                    }
                ],
                courseType: [
                    {
                        required: true,
                        message: "课程分类不能为空",
                        trigger: "change",
                        type:"number"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "全部内容不能为空",
                        trigger: "change",
                        type: "array"
                    }
                ],
                userType: [
                    {
                        required: true,
                        message: "用户分类不能为空",
                        trigger: "change",
                        type: "array"
                    }
                ],
                courseVideos: [
                    {
                        required: true,
                        message: "课程视频不能为空",
                        trigger: "change",
                        type: "array"
                    }
                ],
                price: [
                    {
                        required: true,
                        message: "是否收费不能为空",
                        trigger: "change"
                    }
                ],
                vip: [
                    {
                        required: true,
                        message: "会员专属不能为空",
                        trigger: "change"
                    }
                ],
                courseStatus: [
                    {
                        required: true,
                        message: "课程状态不能为空",
                        trigger: "change"
                    }
                ]
            },
            addValidate: {
                videoTitle: "",
                video: ""
            },
            ruleddValidate: {
                videoTitle: [
                    {
                        required: true,
                        message: "视频标题不能为空",
                        trigger: "blur"
                    }
                ],
                video: [
                    { required: true, message: "视频不能为空", trigger: "blur" }
                ]
            },
            imgUploadLoading: false,
            videoloading: false
        };
    },
    created() {
        removeStore("smeditor");
        this.getType();
        this.getUserList();
    },
    methods: {
        showContent(val){
            console.log(val)
            let list=[];
            this.typeList.forEach(ele=>{
                if(ele.id==val){
                    return list=ele;        
                }
            })
            this.allContent=list.courseContentList;
        },
        onBeforeImgUploading() {
            this.imgUploadLoading = true;
        },
        onImgUploadInforSuccess(res) {
            console.log(res);
            this.imgUploadLoading = false;
            this.addForm.imgUrl = res.data || "";
        },
        handleImgFormatError(file) {
            this.$Notice.error({
                title: "文件格式错误",
                desc: "上传的文件格式是错误的，请选择jpg或者png格式的图片"
            });
        },
        sure() {
            this.addVideo = false;
            this.addForm.courseVideos.push({
                classTitle: this.addValidate.videoTitle,
                classUrl: this.addValidate.video,
                createUser: getStore("username")
            });
        },
        // 删除对应视频
        delconfirm(index) {
            this.$Modal.confirm({
                title: "确认删除",
                content: "<p>确定删除该课程视频？</p>",
                loading: true,
                onOk: () => {
                    // 删除对应视频
                    this.addForm.courseVideos.splice(index, 1);
                    setTimeout(() => {
                        this.$Modal.remove();
                        this.$Message.success("删除成功！");
                    }, 1000);
                }
            });
        },
        beforeUpload(res) {
            console.log(res);
            this.videoloading = true;
        },
        handleSuccess(res) {
            console.log(res);
            this.addValidate.video = res.data;
            this.$Message.success(res.message);
            this.videoloading = false;
            console.log(this.addForm.courseVideos);
        },
        handleFormatError(file) {
            this.videoloading = false;
            this.$Notice.error({
                title: "文件格式错误",
                desc: "上传的文件格式是错误的，请选择.mp4格式的视频"
            });
        },
        //获取所有课程分类
        getType() {
            getCoursetypeList().then(res => {
                if (res.code == 0) {
                    console.log(res);
                    this.typeList = res.data;
                    // 全部内容
                    // let allContent=[];
                    // res.data.forEach(item=>{
                    //    item.courseContentList.forEach(ele=>{
                    //        allContent.push(ele);
                    //    }) 
                    // });
                    // this.allContent=allContent;
                }
            });
        },
        // 获取用户分类
        getUserList() {
            getUserClass().then(res => {
                if (res.code == 0) {
                    this.userTypeList = res.data;
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
        addCourse() {
            console.log(this.addForm.price);
            console.log(this.addForm.userType);
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    addCourseData({});
                }
            });
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
.videoBox {
    display: flex;
    flex-wrap: wrap;
    .videoItem {
        width: 200px;
        p {
            text-align: center;
        }
        video {
            width: 200px;
            height: 100px;
        }
        .delvideo {
            display: block;
            margin: auto;
        }
    }
}
</style>
