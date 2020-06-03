<template>
    <div>
        <Card>
            <p slot="title">节点奖励钱包</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" inline>
                <FormItem label="用户地址：" prop="address" style="width:420px;">
                    <Input v-model="formValidate.address" placeholder="请输入用户地址"></Input>
                </FormItem>
                <FormItem label="打币数量：" prop="amount" style="margin-left:40px">
                    <Input v-model="formValidate.amount" placeholder="请输入打币数量"></Input>
                </FormItem>
                <Button type="primary" @click="handleSubmit" :loading="loading">确定</Button>
            </Form>
        </Card>
    </div>
</template>
<script>
import {freezeAccount } from "@/service/courseApi/api";
export default {
    data() {
        return {
            loading: false,
            formValidate: {
                address: "",
                amount: null
            },
            ruleValidate: {
                address: {
                    required: true,
                    message: "请输入用户地址",
                    trigger: "blur"
                },
                amount: [
                    {
                        required: true,
                        message: "请输入打币数量",
                        trigger: "blur"
                    },
                    { pattern: /^\d+$/, message: "请输入大于0的数字" }
                ]
            }
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