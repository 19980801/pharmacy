<template>
    <div>
        <Card>
            <p slot="title">新增课程</p>
            <Form :model="searchForm" :label-width="100" inline>
                <FormItem label="课程标题">
                    <Input style='width:200px' v-model="searchForm.userId" placeholder="请输入课程标题"></Input>
                </FormItem>
                <FormItem label="课程分类" style="width:450px;">
                    <Select v-model="selected" style='width:200px'>
                        <Option v-for="(item,i) of typeList" :key="i" :value="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="全部内容" style="width:100%;">
                    <CheckboxGroup v-model="fruit">
												<Checkbox :label="item.name" v-for="(item,index) in contentList" :key="index"></Checkbox>
										</CheckboxGroup>
                </FormItem>
                <FormItem label="用户分类" style="width:100%;">
                    <CheckboxGroup v-model="userClassChecked">
                    		<Checkbox :label="item.name" v-for="(item,index) in userClass" :key="index"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="课程视频" style="width:100%;">
                    <div class="videoList">
											
										</div>
                </FormItem>
                <FormItem label="课程介绍" style="width:100%;">
                    <Input v-model="value17" maxlength="100" show-word-limit type="textarea" placeholder="Enter something..." style="width: 200px" />
                </FormItem>
								<FormItem label="收费" style="width:100%;">
								    <RadioGroup v-model="price">
												<Radio label="是"></Radio>
												<Radio label="否"></Radio>
										</RadioGroup>
								</FormItem>
								<FormItem label="价格" style="width:100%;" v-if="price!=='否'">
								    <Input style='width:200px' v-model="searchForm.userId" placeholder="请输入价格"></Input>
								</FormItem>
								<FormItem label="会员专属" style="width:100%;">
								    <RadioGroup v-model="VIP">
								    		<Radio label="是"></Radio>
								    		<Radio label="否"></Radio>
								    </RadioGroup>
								</FormItem>
            </Form>
           <Button type="primary" style="margin-left:50px;width:200px">提交</Button>
        </Card>
    </div>
</template>

<script>
import Vue from "vue";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);
import { getprofit,updateProfit } from "@/service/courseApi/api";
export default {
    data() {
        // 变动类型
        const type = new Map([
            ["0", "预约支付"],
            ["1", "签约支付"],
            ["2", "合约收益"],
            ["3", "推荐收益"],
            ["4", "静态收益扣减"],
            ["5", "全球分红"],
            ["6", "个人分红"],
            ["7", "节点钱包静态加速释放"],
            ["8", "节点钱包动态释放"],
            ["9", "节点钱包奖励"],
        ]);
        // 交易状态
		const payType =new Map([
			["0","失败"],
			["1","成功"],
			["2","人工审核"]
		])
        return {
					contentList:[
						{name:"高血压"},
						{name:"糖尿病"},
						{name:"特殊人群用药"},
						{name:"中药"},
						{name:"注射剂"},
						{name:"处方审核"},
					],//内容list
					contentChecked:[],//选中
					userClass:[
						{name:"院内职工"},
						{name:"实习生"},
						{name:"进修生"},
					],//用户分类list
					userClassChecked:[],
					price:'',
					VIP:'',
					selected:"",
					
					
					
					
					
					
			userPay:"",
			imgcode:"",    //二维码生成值
			size:150,
			ImgCode:false,
			examineForm:{
				id:"",
				dealHash:"",
				dealStatus:""
			},
			toExamine:false,
            searchForm: {
                userId: "",
                address: "",
                startTime: "",
                endTime: ""
            },
            typeList: [
                { value: 0, label: "预约支付" },
                { value: 1, label: "签约支付" },
                { value: 2, label: "合约收益" },
                { value: 3, label: "推荐收益" },
                { value: 4, label: "静态收益扣减" },
                { value: 5, label: "全球分红" },
                { value: 6, label: "个人分红" },
                { value: 7, label: "节点钱包静态加速释放" },
                { value: 8, label: "节点钱包动态释放" },
                { value: 9, label: "节点钱包奖励" },
            ],
            stateList: [
                { value: "0", label: "失败" },
                { value: "1", label: "成功" },
                { value: "2", label: "人工处理" }
			],
			ruleInline:{
				dealHash: [{ required: true, message: '交易哈希不能为空', trigger: 'blur' }],
			},
            total: 0,
            page: 1,
            limit: 10,
            tableColumns: [
                {
                    title: "用户ID",
                    width: 100,
                    key: "userId"
				},
				{
					title:"用户地址",
					key:"address",
					render:(h,params)=>{
						return h(
                            "div",
                            {
								style: {
                                    cursor:"pointer"
                                },
                                on: {
                                    click: () => {
										this.imgcode=params.row.address;
										this.userPay=params.row.contractProfit
										this.ImgCode=true;
									}
                                }
                            },
                        	params.row.address
                        );
					}
				},
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
                    title: "变动类型",
                    width: 110,
                    render: (h, params) => {
                        return h("span", {}, type.get(params.row.earningsType));
                    }
                },
                {
                    title: "收益金额",
                    width: 100,
                    key: "contractProfit"
                },
                {
                    title: "交易哈希",
                    key: "dealHash"
				},
                {
                    title: "交易状态",
                    width: 100,
                    render: (h, params) => {
                        return h("span", {}, payType.get(params.row.dealStatus));
                    }
                },
                {
                    title: "创建时间",
                    width: 150,
                    key: "createTime"
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        if (params.row.dealStatus == 2) {
                            return h(
                                "Button",
                                {
                                    props: {
                                        type: "primary"
                                    },
                                    on: {
                                        click: () => {
											const {dealHash,id}=params.row;
											this.examineForm={dealHash,id};
											this.toExamine=true;
										}
                                    }
                                },
                                "审核"
                            );
                        }
                    }
                }
            ],
            tableData: []
        };
	},
	components: {
    	VueQriously
  	},
    created() {
        this.getTableData();
    },
    activated() {},
    methods: {
		downqriousl() {
      		var can = document.getElementById("qriously");
      		var canvas = can.querySelector("canvas");
    	},
		toUpdate(type){
			this.$refs["examineForm"].validate(valid => {
				if (valid) {
					this.examineForm.dealStatus=type;
					updateProfit({
						...this.examineForm
					}).then(res=>{
						if(res.code==0){
							this.toExamine=false;
							this.$Message.success(res.message);
							this.getTableData();
						}else{
							this.$Message.error(res.message);
						}
					})
				}
      		});
		},
        dateform(time) {
            console.log(time);
            var date = new Date(time);
            console.log(date);
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
            return (
                y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
            );
        },
        search() {
            this.page = 1;
            if (this.searchForm.startTime) {
                this.searchForm.startTime = this.dateform(
                    this.searchForm.startTime
                );
            }
            if (this.searchForm.endTime) {
                this.searchForm.endTime = this.dateform(
                    this.searchForm.endTime
                );
            }
            this.getTableData();
        },
        clear() {
            for (let key in this.searchForm) {
                this.searchForm[key] = "";
            }
            this.getTableData();
        },

        onPageChange(page) {
            this.page = page;
            this.getTableData();
        },
        getTableData() {
            getprofit({
                pageNum: this.page,
                pageSize: this.limit,
                ...this.searchForm
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
.pay{
	font-weight:700;
	font-size:20px;
	text-align:center;
	margin:5px 0;
}
.codeImg{
	width:30%;
	margin:auto;
}
.tableHead {
    width: 100%;
    height: 50px;
    padding: 10px;
    margin-top: 20px;
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
