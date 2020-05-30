<template>
    <div class="content">
        <div class="rightContent">
            <div class="title">
                <p>我的反馈</p>
                <div class="add" @click="showAlert">添加反馈</div>
            </div>
            <ul class="list">
                <li class="listItem" v-for="(item,i) in 2" :key="i">
                    <p class="listTit">反馈：网站体验不是特别好，建议优化依稀啊！！</p>
                    <p>
                        <img src="../../assets/imgs/time.png" alt="" class="time">
                        <span class="date">2019-09-09</span>
                    </p>
                    <div class="bg">
                        <span class="answer">回答：网站体验不是特别好，建议优化依稀啊！！</span>
                        <div>
                            <img src="../../assets/imgs/time.png" alt="" class="time">
                            <span class="date">2019-09-09</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 我的反馈 -->
        <div class="alertMask" v-show="alert">
            <div class="alert">
                <div class="alertTitle">
                    <p>添加反馈</p>
                    <Icon type="md-close" @click="closeAlert" />
                </div>
                <div class="alertCon">
                    <Input v-model="feedContent" type="textarea" :rows="8" placeholder="输入反馈内容" />
                </div>
                <div class="butBox">
                    <div class="button sure">确定</div>
                    <div class="button cancel" @click="closeAlert">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alert: false,
            feedContent:""
        };
    },
    methods: {
        closeAlert() {
            this.alert = false;
        },
        showAlert(){
            this.alert = true;
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
        min-height: 548px;
        padding: 20px;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            border-bottom: 1px solid #ebeef2;
            padding-bottom: 20px;
            .add {
                width: 88px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgba(41, 178, 139, 1);
                border-radius: 4px;
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                cursor: default; 
            }
        }
        .list {
            padding: 10px;
            .listItem {
                p {
                    margin: 10px 0;
                }
                border-bottom: 1px solid #ebeef2;
                padding-bottom: 30px;
                .listTit {
                    height: 22px;
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                    line-height: 22px;
                }
                .time {
                    width: 12px;
                    height: 12px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                .date {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(164, 166, 187, 1);
                }
                .bg {
                    width: 880px;
                    // height: 85px;
                    padding: 20px;
                    background: rgba(246, 248, 250, 1);
                    border-radius: 2px;
                    .answer {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }
            .listItem:last-child {
                border: 0;
            }
        }
    }
    .alertMask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        .alert {
            width: 500px;
            padding: 20px;
            background: #fff;
            border-top: 3px solid #29b28b;
            position: absolute;
            left: 50%;
            top: 50%;
            min-height: 392px;
            margin-top: -181px;
            margin-left: -250px;
            .alertTitle {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(0, 0, 0, 1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f5f5f5;
                padding-bottom: 10px;
            }
            .alertCon {
                margin: 20px 0;
            }
            .butBox {
                width:80%;
                margin:40px auto 0;
                display: flex;
                justify-content:space-around;
                cursor: default;
                .button {
                    width: 140px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 15px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    border-radius: 2px;
                }
                .sure {
                    background: rgba(41, 178, 139, 1);
                    color:#fff;
                }
                .cancel{
                    border:1px solid rgba(41,178,139,1);
                    color:#29B28B;
                }
            }
        }
    }
}
</style>    