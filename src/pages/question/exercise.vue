<template>
    <div class="exercise">
        <div class="exerciseBox">
            <div class="exerciseTitle">
                <div class="title flex-btween">
                    <div class="leftTitle">{{bank.bankTitle}}<span><span
                                class="num">{{questionCur+1}}</span>/{{questionList.length}}</span></div>
                    <div class="rightTime">00:10:10</div>
                </div>
                <div class="content flex-btween">
                    <div class="leftQuestion">
                        <div v-for="(item,index) in questionList" :key="index">
                            <div class="questionList" v-if="questionCur==index">
                                <div class="questionTitle">
                                    <span>{{index+1}}</span>.（{{item.questionType==0?'单选题':'多选题'}}）{{item.questionTitle}}<span>
                                        {{item.questionValue}}分</span></div>
                                <div class="optionsList">
                                    <div class="optionsItem flex"
                                        @click="choseAnswer(index,answerIndex,item.questionType)"
                                        v-for="(answerItem,answerIndex) in item.questionOptionList" :key="answerIndex">
                                        <div>
                                            <Icon type="ios-checkmark-circle" v-if="answerItem.isChecked"
                                                class="btns checked" />
                                            <Icon type="ios-checkmark-circle-outline" v-if="!answerItem.isChecked"
                                                class="btns" />
                                        </div>
                                        <div>{{answerItem.optionContent}}</div>
                                    </div>
                                </div>
                                <div class="btnBox flex-center">
                                    <div :class="{noPre:questionCur==0}" @click="previous(index)">上一题</div>
                                    <div v-if="questionCur+1!=questionList.length" @click="next(index)">下一题</div>
                                    <div @click="submit" v-if="questionCur+1==questionList.length">提交</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="rightAnswer">
                        <div class="answerTitle">答题卡</div>
                        <div class="answerList">
                            <div class="answerItem">
                                <div class="listTitle">单选题</div>
                                <div class="listBox flex">
                                    <div v-for="(item,index) in questionList" :key="index">
                                        <div class="item" v-if="item.questionType==0" :class="{acive:item.isDone}">
                                            {{index+1}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="answerItem">
                                <div class="listTitle">多选题</div>
                                <div class="listBox flex">
                                    <div v-for="(item,index) in questionList" :key="index">
                                        <div class="item" :class="{acive:item.isDone}" v-if="item.questionType==1">
                                            {{index+1}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="typeBox flex">
                            <div class="type flex">
                                <span>已做</span>
                                <div></div>
                            </div>
                            <div class="type unfinished flex">
                                <span>未做</span>
                                <div></div>
                            </div>
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
            questionCur: 0,
            questionList: [],
            bank: ""
        };
    },
    created() {
        console.log(JSON.parse(localStorage.getItem("bank")));
        this.findQuestion();
    },
    methods: {
        // 计时器
        // timers(){
        // 	s=s+1;
        // 	if(s>=60){
        // 		s=00;
        // 		m=m+1
        // 	}
        // 	if(m>=60){
        // 		m=00;
        // 		h=h+1;
        // 	}
        // },
        // 获取题库
        findQuestion() {
            this.bank = JSON.parse(localStorage.getItem("bank"));
            let questionList = JSON.parse(localStorage.getItem("questList"));
            questionList.forEach(item => {
                item.isDone = false;
                item.isRight = 0;
                item.questionOptionList.forEach(i => {
                    i.isChecked = false;
                });
            });
            this.questionList = questionList;
            console.log(this.questionList);
        },
        // 提交答案
        submit() {
            this.$Modal.confirm({
                title: "提示",
                content: "确认提交答案吗",
                onOk: () => {
                    this.$Message.info("提交成功");
                    this.$router.push("/answer");
                },
                onCancel: () => {
                    this.$Message.info("取消提交");
                }
            });
        },
        choseAnswer(index, answerIndex, type) {
            console.log(index, type);
            let list = this.questionList[index].questionOptionList;
            if (type == 0) {
                //单选
                list.map((item, i) => {
                    if (i == answerIndex) {
                        console.log(item);
                        item.isChecked = true;
                        this.questionList[index].isDone = true;
                        if (item.isTrue == 1) {
                            this.questionList[index].isRight = 1;
                        } else {
                            this.questionList[index].isRight = 0;
                        }
                        console.log(this.questionList[index]);
                    } else {
                        item.isChecked = false;
                    }
                });
            } else if (type == 1) {
                list[answerIndex].isChecked = !list[answerIndex].isChecked;
                let isTrue = false;
                console.log(list);
                list.forEach(item => {
                    if (item.isTrue == 1 && item.isChecked || item.isTrue == 0 && !item.isChecked) {
                        isTrue = true;
                    }else{
                        isTrue = false;
                    }
                });
                console.log(isTrue);
                console.log(this.questionList[index]);
            }
            this.questionList[index].questionOptionList = list;
        },
        previous(index) {
            this.questionCur != 0
                ? (this.questionCur = index - 1)
                : this.questionCur;
        },
        next(index) {
            this.questionCur + 1 < this.questionList.length
                ? (this.questionCur = index + 1)
                : this.questionCur;
        }
    }
};
</script>

<style lang="less">
body {
    background: #f5f6f6;
}
.exercise {
    width: 100%;
    .exerciseBox {
        .exerciseTitle {
            width: 100%;
            height: 100px;
            background: rgba(255, 255, 255, 1);
            .title {
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                font-size: 22px;
                font-weight: 600;
                .leftTitle {
                    .num {
                        color: #29b28b;
                    }
                }
                .rightTime {
                }
            }
        }
        .content {
            width: 1200px;
            margin: 0 auto;
            align-items: flex-start;
            margin-top: 20px;
            .leftQuestion {
                width: 850px;
                padding: 30px;
                box-sizing: border-box;
                background: #fff;
                padding: 30px;
                box-sizing: border-box;
                .questionList {
                    .questionTitle {
                        font-size: 16px;
                        color: #1c1f21;
                        span {
                            color: #29b28b;
                            margin-left: 4px;
                        }
                    }
                    .optionsItem {
                        width: 100%;
                        height: 60px;
                        cursor: default;
                        .btns {
                            font-size: 20px;
                            margin-right: 20px;
                        }
                        .checked {
                            color: #29b28b;
                        }
                        color: #969696;
                        font-size: 14px;
                    }
                }
                .btnBox {
                    width: 100%;
                    div {
                        width: 240px;
                        height: 50px;
                        background: #29b28b;
                        border-radius: 4px;
                        text-align: center;
                        line-height: 50px;
                        font-size: 15px;
                        color: #fff;
                        margin: 0 44px;
                        margin-top: 60px;
                        cursor: default;
                    }
                    .noPre {
                        background: rgba(220, 220, 220, 1);
                    }
                }
            }
            .rightAnswer {
                width: 330px;
                // height:316px;
                background: rgba(255, 255, 255, 1);
                padding: 30px;
                box-sizing: border-box;
                .answerTitle {
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 600;
                }
                .answerList {
                    border-bottom: 1px solid #f0f2f5;
                    padding-bottom: 30px;
                    .answerItem {
                        width: 100%;
                        margin-top: 20px;
                        .listTitle {
                            font-size: 14px;
                        }
                        .listBox {
                            flex-wrap: wrap;
                            .item {
                                width: 24px;
                                height: 24px;
                                border-radius: 2px;
                                border: 1px solid rgba(220, 224, 228, 1);
                                text-align: center;
                                line-height: 24px;
                                font-size: 14px;
                                margin-top: 10px;
                                margin-right: 8px;
                            }
                            .item.acive {
                                background: #29b28b;
                                color: #fff;
                            }
                        }
                    }
                }
                .typeBox {
                    width: 100%;
                    .type {
                        margin-right: 20px;
                        margin-top: 20px;
                        div {
                            width: 17px;
                            height: 17px;
                            background: rgba(41, 178, 139, 1);
                            border-radius: 2px;
                            margin-left: 6px;
                        }
                    }
                    .unfinished {
                        div {
                            background: #c8cdd0;
                        }
                    }
                }
            }
        }
    }
}
</style>
