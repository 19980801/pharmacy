<template>
    <div class="content">
        <div class="rightContent">
            <!-- 学习记录 -->
            <div class="learningBox rightBox" v-if="leftCur==0">
                <div class="tabCar flex">
                    <div :class="{tabActive:learningCur==index}" @click="choseLearningTab(index)"
                        v-for="(item,index) in learningList" :key="index">{{item.name}}</div>
                </div>
                <div class="classList" v-if="learningCur==0">
                    <div class="classItem flex" v-for="(item,index) in 3" :key="index">
                        <img class="leftImg" src="../../assets/imgs/index/loginPic.png" alt="">
                        <div class="rightClassTitle">
                            <div class="studyBtn">继续学习</div>
                            <div class="topTitle">第六届技能大赛-药师药学服务人学服务人文胜服务人文胜任力宣讲会-技能大赛比赛题型解析</div>
                            <div class="validityTime flex">
                                <div class="validityTimeBox">
                                    <p>学习有效期（倒计时）</p>
                                    <p>有效期至：2020.11.07</p>
                                </div>
                                <div class="collectBox" :class="{active:index==0}">
                                    <Icon type="md-heart" />
                                    <span>收藏</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="errorsList" v-if="learningCur==1">
                    <ul class="tab">
                        <li class="tabItem" :class="{acitve:itemId==i}" v-for="{item,i} in 4" :key="i" @click="clickList(i)">选择题</li>
                    </ul>
                    <div class="errorsItem flex-btween" v-for="(item,index) in 6" :key="index">
                        <div class="errorsTitleBox flex">
                            <span>（单选题）</span>
                            <p>具有中枢抑制作用的抗胆碱药是 </p>
                        </div>
                        <div class="errorsBtn">查看</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 错题详情弹框 -->
        <div class="alertMask" v-show="alert">
            <div class="alert">
                <div class="alertTitle">
                    <p>错题详情</p>
                    <Icon type="md-close" @click="closeAlert" />
                </div>
                <div class="alertCon">
                    <div>
                        <p class="title">（单选题）具有中枢抑制作用的抗胆碱药是</p>
                        <div class="optionBox">
                            <RadioGroup v-model="vertical" vertical>
                                <Radio label="资产保值，我不愿意承担任何投资风险">
                                    <span>资产保值，我不愿意承担任何投资风险</span>
                                </Radio>
                                <Radio label="尽可能保证本金安全，不在乎收益率比较低">
                                    <span>尽可能保证本金安全，不在乎收益率比较低</span>
                                </Radio>
                                <Radio label="产生较多的收益，可以承担一定的投资风险">
                                    <span>产生较多的收益，可以承担一定的投资风险</span>
                                </Radio>
                                <Radio label="实现资产大幅增长，愿意承担很大的投资风险">
                                    <span>实现资产大幅增长，愿意承担很大的投资风险</span>
                                </Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <div class="answerBox">
                        <div class="line">
                            <p class="marginRight">
                                <span class="answerTit">正确答案：</span>
                                <span class="correct">B</span>
                            </p>
                            <p>
                                <span>您的答案：</span>
                                <span class="error">A</span>
                            </p>
                        </div>
                        <div class="borderBottom">
                            <div class="line middle">
                                <p>
                                    <span class="answerTit">答案解析：</span>
                                    <p>阿片类药物常见的不良反应有：便秘，恶心、呕吐，嗜睡及过度镇静，尿储留，瘙痒，眩晕，精神错乱及中枢神经毒性反应，呼吸抑制等。(麻醉药品临床应用指导原则》）</p>
                                </p>
                            </div>
                            <div class="collectionBox">
                                <div>
                                    <img src="../../assets/imgs/collection.png" alt="">
                                    <span>收藏</span>
                                </div>
                                <div>
                                    <img src="../../assets/imgs/feedback.png" alt="">
                                    <span>收藏</span>
                                </div>
                            </div>
                        </div>
                        <div class="line middle">
                            <p>
                                <span class="answerTit">相关课程：</span>
                                <p>暂无相关课程</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leftCur: 0,
            vertical: "",
            learningList: [
                { name: "课程", id: 1 },
                { name: "题库", id: 2 }
            ],
            learningCur: 0, //学习记录选项卡
            alert: false,
            itemId:0
        };
    },
    methods: {
        // 学习记录选项卡
        choseLearningTab(i) {
            this.learningCur = i;
        },
        // 显示弹框
        showAlert() {
            this.alert = true;
        },
        // 关闭弹框
        closeAlert() {
            this.alert = false;
        },
        // 显示对应列表
        clickList(i){
            console.log(i);
            this.itemId=i;
        }
    }
};
</script>

<style scoped lang="less">
.content {
    .rightContent {
        width: 960px;
        background: #fff;
        border-radius: 2px;
        min-height: 600px;
        .rightBox {
            .tabCar {
                width: 100%;
                height: 68px;
                border-bottom: 1px solid #f0f2f5;
                padding: 0 30px;
                box-sizing: border-box;
                div {
                    width: 110px;
                    height: 100%;
                    background: #fff;
                    font-size: 14px;
                    color: #313436;
                    text-align: center;
                    line-height: 68px;
                    cursor: default;
                }
                div.tabActive {
                    color: #29b28b;
                    font-size: 18px;
                    border-bottom: 1px solid #29b28b;
                }
            }
        }
        .learningBox {
            .classList {
                width: 100%;
                background: #fff;
                .classItem {
                    width: 100%;
                    height: 210px;
                    background: #fff;
                    padding: 0 30px;
                    box-sizing: border-box;
                    .leftImg {
                        width: 270px;
                        height: 150px;
                    }
                    .rightClassTitle {
                        padding-left: 30px;
                        box-sizing: border-box;
                        width: 630px;
                        height: 150px;
                        border-bottom: 1px solid #f0f2f5;
                        position: relative;
                        .studyBtn {
                            width: 98px;
                            height: 34px;
                            background: rgba(41, 178, 139, 1);
                            border-radius: 2px;
                            font-size: 15px;
                            color: #fff;
                            text-align: center;
                            line-height: 34px;
                            position: absolute;
                            right: 0;
                            bottom: 20px;
                            cursor: default;
                        }
                        .topTitle {
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 16px;
                            font-weight: 600;
                        }
                        .validityTime {
                            margin-top: 55px;
                            .validityTimeBox {
                                color: #b4b6bc;
                            }
                            p {
                                margin: 10px 0;
                            }
                            .collectBox {
                                margin-top: 20px;
                                margin-left: 30px;
                                font-size: 14px;
                                color: #07111b;
                                span {
                                    margin-left: 10px;
                                }
                            }
                            .collectBox.active {
                                color: #ff077a;
                            }
                        }
                    }
                }
            }
            .errorsList {
                width: 100%;
                background: #fff;
                .errorsItem {
                    width: 100%;
                    padding: 0 30px;
                    box-sizing: border-box;
                    height: 70px;
                    .errorsTitleBox {
                        font-size: 16px;
                        span {
                            color: #29b28b;
                        }
                        p {
                            color: #1c1f21;
                            font-weight: 600;
                        }
                    }
                    .errorsBtn {
                        width: 140px;
                        height: 40px;
                        border-radius: 2px;
                        border: 1px solid rgba(41, 178, 139, 1);
                        text-align: center;
                        color: rgba(41, 178, 139, 1);
                        line-height: 40px;
                        cursor: default;
                    }
                }
                .tab{
                    display:flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    cursor:default;
                    .tabItem{
                        font-size:14px;
                        font-family:PingFang-SC-Regular,PingFang-SC;
                        font-weight:400;
                        color:rgba(28,31,33,1);
                        line-height:34px;
                        margin:30px 40px 0;
                        height:34px;
                        text-align:center;
                        .active{
                            color:#fff;
                            background:rgba(41,178,139,1);
                            border-radius:17px;
                        }
                    }
                }
            }
        }
    }
    .alertMask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
                // 单选框样式
                /deep/ .ivu-radio-inner {
                    width: 20px;
                    height: 20px;
                }
                /deep/ .ivu-radio-inner:after {
                    content: "";
                    background: url("../../assets/imgs/clicked.png");
                    background-size: 100%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    top: 0;
                    left: 0;
                    position: relative;
                }
                /deep/ .ivu-radio-group-vertical .ivu-radio-wrapper {
                    height: 45px;
                }
                padding: 10px 20px 40px;
                .title {
                    height: 26px;
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(28, 31, 33, 1);
                    line-height: 22px;
                }
                .optionBox {
                    padding: 10px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(150, 150, 150, 1);
                }
                .answerBox {
                    background: rgba(246, 248, 250, 1);
                    border-radius: 2px;
                    padding: 10px;
                    .middle {
                        border: 0 !important;
                    }
                    .borderBottom {
                        border-bottom: 1px solid #ebeef2;
                    }
                    .line {
                        display: flex;
                        padding: 8px 0;
                        border-bottom: 1px solid #ebeef2;
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(28, 31, 33, 1);
                        line-height: 22px;
                        .title {
                            width: 30%;
                        }
                        .marginRight {
                            margin-right: 30px;
                        }
                        p {
                            display: flex;
                        }
                        .correct {
                            height: 20px;
                            font-size: 14px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgba(28, 187, 255, 1);
                            line-height: 20px;
                        }
                        .error {
                            height: 20px;
                            font-size: 14px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgba(255, 36, 134, 1);
                            line-height: 20px;
                        }
                        .answerTit {
                            display: block;
                            width: 80px;
                            height: 20px;
                            font-size: 14px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgba(7, 17, 27, 1);
                            line-height: 20px;
                        }
                    }
                    .collectionBox {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(28, 31, 33, 1);
                        margin: 20px;
                        img {
                            width: 15px;
                            height: 15px;
                            vertical-align: middle;
                            margin: 0 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>