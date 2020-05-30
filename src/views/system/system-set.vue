<template>
  <div>
    <Card>
      <p slot="title">参数配置</p>
      <Row>
        <Table :columns="columns_first" :data="userpage" border :loading="ifLoading"></Table>
      </Row>
      <div class="pageWrapper">
        <Page :total="totalNum" :current="currentPageIdx" @on-change="changePage" show-elevator></Page>
      </div>
      <Modal v-model="addModal" :title="'修改'+modalTitle" :closable="false">
        <Form ref="formValidate" :model="formValidate" :label-width="150" :rules="ruleValidate">
          <FormItem :label="modalTitle" prop="value">
            <Input v-model="formValidate.value"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="default" @click="addModal=false">取消</Button>
          <Button type="primary" @click="sure">确定</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { getList, updateInfo, getInfo } from "@/service/systemApi/api";
export default {
  data() {
    return {
      currentPageIdx: 1,
      addDayModal:false,
      ifLoading: true,
      totalNum: null,
      addModal: false,
      addNumModal: false,
      payModal:false,
      modalTitle:"",
      formValidate: {
        value: "",
        id: null
      },
      ruleValidate: {
        value: [
          { required: true, message: "值不能为空", trigger: "blur" }
        ]
      },
      numform: {
        value: "",
        id: null
      },
      numrule: {
        value: [
          {
            required: true,
            message: "推荐收益最小提取数量不能为空",
            trigger: "blur"
          }
        ]
      },
      columns_first: [
        {
          title: "键",
          key: "code"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "值",
          key: "value",
          render: (h, params) => {
            console.log(params.row);
            let text = "";
            if (params.row.code == "periodOfValidity" || params.row.code == "remainingTime") {
              text = "小时";
            }else if(params.row.code=="extractCount"){
              text="日";
            }
            return h("span", {}, params.row.value + text);
          }
        },
        {
          title: "描述",
          key: "codeDesc"
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
                      const { id, value,name } = params.row;
                      this.formValidate = {id,value};
                      this.modalTitle=name;
                      this.addModal=true;
                    }
                  }
                },
                "编辑"
              )
            ];
          }
        }
      ],
      userpage: []
    };
  },
  methods: {
    refreshPage(obj) {
      this.ifLoading = true;
      getList().then(res => {
        console.log(res);
        if (res.code == 0) {
          this.ifLoading = false;
          this.userpage = res.data;
          this.totalNum = res.data.length;
        }
      });
    },
    // 修改
    sure() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          updateInfo({
            ...this.formValidate
          }).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.addModal = false;
              this.$Message.success(res.message);
              this.refreshPage();
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      this.refreshPage(this.filterSearch);
    }
  },
  created() {
    this.refreshPage();
  }
};
</script>

<style scoped lang='less'>
</style>