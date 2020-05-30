<template>
    <div>
        <Card>
            <p slot="title">收益管理</p>
            <Form :model="searchForm" :label-width="100" inline>
                <FormItem label="用户ID">
                    <Input v-model="searchForm.userId" placeholder="请输入用户ID"></Input>
                </FormItem>
                <FormItem label="用户地址" style="width:450px;">
                    <Input v-model="searchForm.address" placeholder="请输入用户地址"></Input>
                </FormItem>
                <FormItem label="开始时间">
                    <DatePicker type="date" placeholder="请选择开始时间" v-model="searchForm.startTime"></DatePicker>
                </FormItem>
                <FormItem label="结束时间">
                    <DatePicker type="date" placeholder="请选择结束时间" v-model="searchForm.endTime"></DatePicker>
                </FormItem>
                <FormItem label="变动类型" style="width:300px;">
                    <Select v-model="searchForm.earningsType">
                        <Option v-for="(item,i) of typeList" :key="i" :value="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="交易结果" style="width:200px;">
                    <Select v-model="searchForm.dealStatus">
                        <Option v-for="(item,i) of stateList" :key="i" :value="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <Button type="primary" @click="search">
                    <Icon type="ios-search" style="font-size:16px" />查询</Button>
                <Button type="default" style="margin-left:10px" @click="clear">
                    <Icon type="ios-undo" style="font-size:16px" />重置</Button>
            </Form>
            <div class="tableHead">
                <div>数据列表</div>
            </div>
            <Table :columns="tableColumns" :data="tableData" border width></Table>
            <Page :total="total" :current="page" :page-size="limit" show-total @on-change="onPageChange" />

            <Modal v-model="toExamine" title="审核" :footer-hide="true">
				<Form ref="examineForm" :model="examineForm" :label-width="100" :rules="ruleInline">
					<FormItem label="交易哈希：" prop="dealHash">
                    	<Input v-model="examineForm.dealHash" type="textarea"></Input>
                	</FormItem>
				</Form>
				<div style="text-align:center;">
					<Button type="error" @click="toUpdate(0)">审核失败</Button>
					<Button type="primary" @click="toUpdate(1)">审核成功</Button>
				</div>
            </Modal>
			<Modal v-model="ImgCode" title="地址二维码" :footer-hide="true">
				<p class="pay">收益金额：{{userPay}}</p>
				<div class="codeImg">
					<qriously :value="imgcode" :size="size" v-if="imgcode" id="qriously" />
				</div>
            </Modal>
        </Card>
    </div>
</template>

<script>
import Vue from "vue";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);
import { getprofit,updateProfit } from "@/service/profitApi/api";
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
