<template>
    <div class="content">
        <div class="typeBox">
            <div class="typeLine">
                <p class="typeTitle">题库状态：</p>
                <ul>
                    <li class="active">全部</li>
                </ul>
            </div>
            <div class="typeLine">
                <p class="typeTitle">更新时间：</p>
                <ul>
                    <li>全部</li>
                    <li>2020</li>
                    <li>2019</li>
                </ul>
            </div>
        </div>
        <div class="listBox">
            <div class="list">
                <ul>
                    <li class="listItem" v-for="(item,i) in list" :key="i">
                        <div class="left">
                            <img src="../../assets/imgs/1.png" alt="">
                        </div>
                        <div class="right">
                            <div class="title">
                                <p>{{item.bankTitle}}</p>
                                <div class="time">
                                    <img src="../../assets/imgs/time.png" alt="">
                                    <span>{{item.createTime}}</span>
                                </div>
                            </div>
                            <div class="msgBox">
                                <div class="msgInfo">
                                    <div class="infoItem">
                                        <img src="../../assets/imgs/number.png" alt="">
                                        <span>题目数量</span>
                                    </div>
                                    <div class="infoItem">
                                        <img src="../../assets/imgs/finshed.png" alt="">
                                        <span>已做数量</span>
                                    </div>
                                    <div class="infoItem">
                                        <img src="../../assets/imgs/nofinshed.png" alt="">
                                        <span>未做数量</span>
                                    </div>
                                </div>
                                <div class="button" @click="showAlert">开始练习</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pageBox">
            <div class="page">
                <p>首页</p>
                <Page :total="total" :current="pageNum" :page-size="limit" prev-text="上一页" next-text="下一页"
                    @on-change="onPageChange" />
                <p>尾页</p>
            </div>
        </div>

        <!-- 弹框 -->
        <div class="alertMask" v-show="alert">
            <div class="alert">
                <div class="alertTitle">
                    <p>选择练习类型</p>
                    <Icon type="md-close" @click="closeAlert" />
                </div>
                <div class="alertCon">
                    <ul class="line">
                        <li class="typeTit">题目类型：</li>
                        <li>选择题</li>
                        <li>处方审核题</li>
                        <li>用药交待题</li>
                        <li>用药风险评估题</li>
                    </ul>
                    <ul class="line">
                        <li class="typeTit">题目分类：</li>
                        <div class="typeBg">
                            <ul>
                                <li class="active">全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                                <li>全部</li>
                            </ul>
                        </div>
                    </ul>
                    <ul class="line">
                        <li class="typeTit">练习范围：</li>
                        <li>全部(5352)</li>
                        <li>已做(20)</li>
                        <li>未做(888)</li>
                        <li>错题(888)</li>
                    </ul>
                    <ul class="line">
                        <li class="typeTit">练习数量：</li>
                        <li>10</li>
                        <li>20</li>
                        <li>50</li>
                    </ul>
                </div>
                <div class="begin" @click="goExercise">开始练习</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alert: false,    //弹框
            total:0,
            limit:10,
            pageNum:1,
            year:"",
            list:[]
        };
    },
    created(){
        this.getList();
    },
    methods: {
        // 跳转练习
        goExercise() {
            this.$router.push("/exercise");
        },
        // 显示弹框
        showAlert() {
            this.alert = true;
        },
        // 关闭弹框
        closeAlert() {
            this.alert = false;
        },
        getList() {
            this.$http.post("/bank/pageQuery", {
                pageNum:this.pageNum,
                pageSize:this.limit,
                updateTime:this.year
            }).then(res=>{
                if(res.code==0){
                    console.log(res);
                    this.list=res.data.content;
                    this.total = res.data.totalElements;
                }
            })
        },
        onPageChange(page) {
            this.pageNum = page;
            this.getList();
        },
    }
};
</script>

<style scoped lang="less">
.content {
    // 分页样式
    /deep/ .ivu-page-item {
        border-radius: 50%;
        margin: 0 20px;
        border: 0;
        color: #4d555d;
        font-size: 14px;
        width: 35px;
        height: 35px;
        line-height: 35px;
    }
    /deep/ .ivu-page-item-active {
        background: rgba(77, 85, 93, 1);
        color: #fff;
    }
    /deep/ .ivu-page-item-active a,
    .ivu-page-item-active:hover a {
        color: #fff;
    }
    // 小图标大小
    /deep/ .ivu-icon {
        width: 12px;
        height: 12px;
    }
    .typeBox {
        margin-bottom: 40px;
        .active {
            background: rgba(41, 178, 139, 0.2);
            border-radius: 4px;
            color: #29b28b;
            font-weight: 800;
        }
        font-family: PingFang-SC-Heavy, PingFang-SC;
        width: 1200px;
        margin: auto;
        cursor: pointer;
        .typeLine {
            display: flex;
            line-height: 34px;
            margin: 10px 0;
            height: auto;
        }
        .typeLine:first-child {
            padding-bottom: 18px;
            border-bottom: 1px solid #ebeef2;
        }
        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            height: auto;
            li {
                margin: 0 20px;
                text-align: center;
                height: 34px;
                padding: 0 12px;
                line-height: 34px;
                font-size: 14px;
                font-family: PingFang-SC-Regular, PingFang-SC;
                font-weight: 400;
                color: rgba(28, 31, 33, 1);
            }
        }
        .typeTitle {
            width: 100%;
            display: inline-block;
            font-size: 14px;
            font-family: PingFang-SC-Heavy, PingFang-SC;
            font-weight: 800;
            color: rgba(7, 17, 27, 1);
            width: 76px;
            text-align: justify;
        }
    }
    .listBox {
        width: 100%;
        border-top: 1px solid #ebeef2;
        .list {
            width: 1200px;
            margin: auto;
            .listItem {
                margin: 30px 0;
                display: flex;
                padding: 15px;
                .left {
                    img {
                        width: 340px;
                        height: 200px;
                    }
                }
                .right {
                    width: 80%;
                    margin-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 10px 0;
                    .title {
                        p {
                            height: 28px;
                            font-size: 20px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgb(51, 52, 53);
                            line-height: 28px;
                        }
                        .time {
                            margin: 10px 0;
                            img {
                                width: 12px;
                                height: 12px;
                                margin-right: 5px;
                            }
                            span {
                                height: 20px;
                                font-size: 14px;
                                font-family: PingFangSC-Regular, PingFang SC;
                                font-weight: 400;
                                color: rgba(164, 166, 187, 1);
                                line-height: 20px;
                            }
                        }
                    }
                    .msgBox {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .msgInfo {
                            display: flex;
                            align-items: center;
                            .infoItem {
                                display: flex;
                                align-items: center;
                                margin-right: 35px;
                                img {
                                    width: 18px;
                                    height: 18px;
                                    vertical-align: middle;
                                    margin-right: 8px;
                                }
                                span {
                                    font-size: 14px;
                                    font-family: PingFangSC-Regular, PingFang SC;
                                    font-weight: 400;
                                    color: rgba(7, 17, 27, 1);
                                }
                            }
                        }
                        .button {
                            text-align: center;
                            width: 98px;
                            height: 34px;
                            line-height: 34px;
                            background: rgba(41, 178, 139, 1);
                            border-radius: 2px;
                            color: #fff;
                            font-size: 15px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            cursor: pointer;
                        }
                    }
                }
            }
            .listItem:hover {
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 0px 12px 0px rgba(15, 58, 46, 0.14);
                border: 1px solid rgba(41, 178, 139, 1);
            }
        }
    }
    .pageBox {
        text-align: center;
        .page {
            display: inline-flex;
            height: 35px;
            line-height: 35px;
            color: #4d555d;
            font-size: 14px;
        }
        p {
            margin: 0 20px;
        }
        margin: 50px auto;
    }
    // 弹框, 弹框遮罩层
    .alertMask {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        .alert {
            z-index: 999;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            top: 50%;
            left: 50%;
            border-top: 3px solid #29b28b;
            position: absolute;
            width: 770px;
            min-height: 400px;
            margin-top: -200px;
            margin-left: -385px;
            .active {
                background: rgba(41, 178, 139, 0.2);
                border-radius: 4px;
                color: #29b28b;
                font-weight: 800;
            }
            .alertTitle {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(0, 0, 0, 1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f5f5f5;
                padding: 15px;
            }
            .alertCon {
                padding: 0 20px;
                .line {
                    border-bottom: 1px solid #f5f5f5;
                    padding: 10px 0;
                    .typeBg {
                        width: 80%;
                        background: rgba(245, 248, 250, 1);
                        padding: 8px;
                        ul {
                            align-items: baseline;
                        }
                    }
                }
                ul {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    height: auto;
                    li {
                        margin: 0 20px;
                        text-align: center;
                        height: 34px;
                        padding: 0 12px;
                        line-height: 34px;
                        font-size: 14px;
                        font-family: PingFang-SC-Regular, PingFang-SC;
                        font-weight: 400;
                        color: rgba(28, 31, 33, 1);
                    }
                    .typeTit {
                        height: 20px;
                        font-size: 14px;
                        font-family: PingFang-SC-Heavy, PingFang-SC;
                        font-weight: 800;
                        color: rgba(7, 17, 27, 1);
                        line-height: 20px;
                    }
                }
            }
            .begin {
                position: absolute;
                left: 50%;
                margin-left: -100px;
                bottom: 20px;
                width: 200px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgba(41, 178, 139, 1);
                border-radius: 2px;
                color: #fff;
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                cursor: pointer;
            }
        }
    }
}
</style>