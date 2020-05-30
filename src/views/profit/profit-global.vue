<template>
    <div>
        <Card>
            <p slot="title">分红</p>
            <div style="margin-bottom:20px">
                <h3>全球分红</h3>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" inline>
                <FormItem label="全球分红：" prop="nums">
                    <Input v-model="formValidate.nums" placeholder="请输入分红数量"></Input>
                </FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" :loading="loading">确定</Button>
            </Form>
            <div style="margin-bottom:20px">
                <h3>全球节点月分红</h3>
            </div>
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="90" inline>
                <FormItem label="地址：" prop="location">
                    <Input v-model="formValidate1.location" placeholder="请输入地址"></Input>
                </FormItem>
                <FormItem label="数量：" prop="count" style="margin-left:40px">
                    <Input v-model="formValidate1.count" placeholder="请输入数量"></Input>
                </FormItem>
                <Button type="primary" @click="handleSubmit1('formValidate1')" :loading="loadings">确定</Button>
            </Form>
        </Card>
    </div>
</template>
<script>
import { getprofitnum } from "@/service/profitApi/api";
export default {
    data() {
        return {
            loading: false,
            loadings: false,
            tableData: "",
            tableData2: "",
            formValidate: { nums: "" },
            formValidate1: {
                location: "",
                count: ""
            },
            ruleValidate: {
                nums: [
                    {
                        required: true,
                        message: "请输入利润分红",
                        trigger: "blur"
                    },
                    {
                        pattern: /^[-]?[0-9]+(\.[0-9]+)?$/,
                        message: "请输入数字"
                    }
                ]
            },
            ruleValidate1: {
                location: [
                    { required: true, message: "请输入地址", trigger: "blur" }
                ],
                count: [
                    {
                        required: true,
                        message: "请输入数量",
                        trigger: "blur"
                    },
                    { pattern: /^\d+$/, message: "请输入大于0的数字" }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            if (this.formValidate.nums == "" || null) {
                return;
            }
            this.loading = true;
            let _this = this;
            setTimeout(function() {
                _this.loading = false;
            }, 2000);
            console.log(this.formValidate.nums);
            getprofitnum({
                amount: this.formValidate.nums
            }).then(res => {
                console.log(res);
                if (res.code == 0) {
                    this.$Message.success(res.message);
                } else {
                    this.$Message.error(res.message);
                }
            });
        },
        handleSubmit1() {
            if (
                this.formValidate1.location == "" ||
                null ||
                (this.formValidate1.count == "" || null)
            ) {
                return;
            }
            this.loadings = true;
            let _this = this;
            setTimeout(function() {
                _this.loadings = false;
            }, 2000);
            getprofitnum({
                address: this.formValidate1.location,
                number: this.formValidate1.count
            }).then(res => {
                if (res.code == 0) {
                    this.$Message.success(res.message);
                } else {
                    this.$Message.error(res.message);
                }
            });
        }
    }
};
</script>
<style lang="less">
</style>