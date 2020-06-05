<template>
    <div>
        <Card>
            <p slot="title">课程列表</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" inline>
                <FormItem label="课程标题：" prop="address" style="width:320px;">
                    <Input v-model="formValidate.address" placeholder="请输入课程标题"></Input>
                </FormItem>
                <FormItem label="是否收费：" prop="amount" style="margin-left:40px">
                   <Select v-model="selected" style='width:200px'>
                       <Option v-for="(item,i) of typeList" :key="i" :value="item.value">{{item.label}}</Option>
                   </Select>
                </FormItem>
                <Button type="primary" @click="handleSubmit" :loading="loading">确定</Button>
            </Form>
						<Table :columns="tableColumns" :data="tableData" border></Table>
        </Card>
    </div>
</template>
<script>
import {freezeAccount } from "@/service/courseApi/api";
export default {
    data() {
        return {
					tableColumns:[
						{
							title: "课程名字",
							key: "className"
						},
						{
							title: "视频数",
							key: "videoCount"
						},
						{
							title: "状态",
							key: "state"
						},
						{
							title: "创建时间",
							key: "creatDate"
						},
						{
							title: "创建人",
							key: "creatMan"
						},{
							title: "收费",
							key: "Toll"
						},{
							title: "操作",
							key: "creatDate",
							render: (h, params) => {
								return h('div', [
										h('span', {
												props: {
														type: 'primary',
														size: 'small'
												},
												style: {
														marginRight: '8px',
														cursor: 'pointer'
												},
												on: {
														click: () => {
																this.show(params.index)
														}
												}
										}, '编辑'),
										h('span', {
												props: {
														type: 'error',
														size: 'small'
												},
												style: {
														cursor: 'pointer'
												},
												on: {
														click: () => {
																this.remove(params.index)
														}
												}
										}, '下架')
								]);
							}
						},
					],
					tableData:[
						{
							className:'医药沙龙大讲堂',
							videoCount:4,
							state:"上架",
							creatDate:"2020-10-20",
							creatMan:"张三",
							Toll:'收费'
						},
						{
							className:'大药堂',
							videoCount:3,
							state:"上架",
							creatDate:"2020-12-20",
							creatMan:"张哈哈",
							Toll:'收费'
						},
					],
					
					
					
					
					
					
					
            loading: false,
            formValidate: {
                address: "",
                amount: null
            },
            
        };
    },
    methods: {
        handleSubmit() {
            this.$refs["formValidate"].validate(valid => {
				if (valid) {
                    this.loading = true;
					freezeAccount({
						...this.formValidate
					}).then(res=>{
						if(res.code==0){
                            this.$Message.success(res.message);
                            for(let key in this.formValidate){
                                this.formValidate[key]="";
                            }
                            this.loading = false;
						}else{
							this.$Message.error(res.message);
                            this.loading = false;
						}
					})
				}
      		});
        }
    }
};
</script>
<style lang="less">

</style>