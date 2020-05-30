<template>
    <div class="content">
        <div class="rightContent">
            <div class="title">
                <p>基本信息</p>
                <div class="save">保存</div>
            </div>
            <div class="conBox">
                <div class="line">
                    <span class="titleMsg">头像</span>
                    <div id="upload">
                        <div class="item_bock">
                            <div class="head_img" @click.stop="uploadHeadImg">
                                <img :src="avatar" />
                                <div class="update">修改</div>
                            </div>
                            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
                        </div>
                    </div>
                </div>
                <div class="line">
                    <span class="titleMsg">昵称</span>
                    <input type="text">
                </div>
            </div>
            <div class="title">
                <p>账号安全</p>
            </div>
            <div class="conBox">
                <div class="line">
                    <span class="titleMsg">手机号</span>
                    <span>12345678</span>
                    <p class="button" @click="updatePhone">更换</p>
                </div>
                <div class="line">
                    <span class="titleMsg">密码</span>
                    <span>12345678</span>
                    <p class="button" @click="updatePsd">修改</p>
                </div>
            </div>
        </div>
        <!-- 更换手机号 -->
        <div class="alertMask" v-show="phoneAlert">
            <div class="alert">
                <div class="alertTitle">
                    <p>更换手机号</p>
                    <Icon type="md-close" @click="closePhoneAlert" />
                </div>
                <div class="alertCon">
                    <div v-if="first">
                        <div class="conTit">
                            <p>验证旧手机号</p>
                            <p>1234567</p>
                        </div>
                        <div class="inputBox">
                            <input type="text" placeholder="输入验证码">
                            <div class="code">获取验证码</div>
                        </div>
                        <div class="button">下一步</div>
                    </div>
                    <div v-else>
                        <div class="phoneBox">
                            <div class="inputBox">
                                <div class="msg">+86</div>
                                <input type="text" placeholder="输入新手机">
                            </div>
                            <div class="inputBox">
                                <input type="text" placeholder="输入验证码">
                                <div class="code">获取验证码</div>
                            </div>
                            <div class="button">绑定</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改密码 -->
        <div class="alertMask" v-show="psdAlert">
            <div class="alert">
                <div class="alertTitle">
                    <p>修改密码</p>
                    <Icon type="md-close" @click="closePsdAlert" />
                </div>
                <div class="alertCon">
                    <div >
                        <div class="inputBox">
                            <div class="msg">+86</div>
                            <input type="text" placeholder="输入新手机">
                        </div>
                        <div class="inputBox">
                            <input type="text" placeholder="输入验证码">
                            <div class="code">获取验证码</div>
                        </div>
                        <div class="inputBox">
                            <input type="text" placeholder="输入新密码" class="newInput">
                        </div>
                        <div class="button">绑定更改</div>
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
            avatar: require("../../assets/imgs/index/userImg.png"),
            first: false,
            phoneAlert: false,
            psdAlert: false
        };
    },
    methods: {
        closePhoneAlert() {
            this.phoneAlert = false;
        },
        updatePhone() {
            this.phoneAlert = true;
        },
        closePsdAlert(){
            this.psdAlert=false;
        },
        updatePsd(){
            this.psdAlert=true;
        },
        // 打开图片上传
        uploadHeadImg: function() {
            this.$el.querySelector(".hiddenInput").click();
        },
        // 将头像显示
        handleFile: function(e) {
            let $target = e.target || e.srcElement;
            let file = $target.files[0];
            var reader = new FileReader();
            reader.onload = data => {
                let res = data.target || data.srcElement;
                this.userInfo.avatar = res.result;
            };
            reader.readAsDataURL(file);
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
        min-height: 800px;
        padding: 20px;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eeeeee;
            padding: 0 0 20px;
            p {
                height: 30px;
                font-size: 22px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 30px;
            }
            .save {
                text-align: center;
                width: 88px;
                height: 40px;
                line-height: 40px;
                background: rgba(41, 178, 139, 1);
                border-radius: 4px;
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }
        }
        .conBox {
            padding: 20px;
            margin-bottom: 20px;
            .line {
                height: 88px;
                line-height: 88px;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                input {
                    width: 342px;
                    height: 40px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 2px;
                    border: 1px solid #eeeeee;
                }
                #upload {
                    .item_bock {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: #fff;
                    }
                    .head_img {
                        position: relative;
                        overflow: hidden;
                        width: 70px;
                        height: 70px;
                        img {
                            width: 70px;
                            height: 70px;
                            border-radius: 50px;
                        }
                        .update {
                            position: absolute;
                            bottom: 0;
                            color: #fff;
                            background: rgba(0, 0, 0, 0.2);
                            width: 70px;
                            height: 35px;
                            text-align: center;
                            border-radius: 0 0 50px 50px;
                        }
                    }
                    .hiddenInput {
                        display: none;
                    }
                }
                .titleMsg {
                    width: 90px;
                }
                .button {
                    width: 88px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: rgba(41, 178, 139, 1);
                    border-radius: 4px;
                    font-size: 15px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    margin-left: 60px;
                    color: rgba(255, 255, 255, 1);
                    cursor: default;
                }
            }
        }
        .conBox:last-child {
            border-bottom: 1px solid #ebeef2;
            padding-bottom: 80px;
        }
    }
    .alertMask {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        .alert {
            width: 500px;
            min-height: 376px;
            background: #fff;
            z-index: 999;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            top: 50%;
            left: 50%;
            border-top: 3px solid #29b28b;
            position: absolute;
            margin-left: -250px;
            margin-top: -188px;
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
                text-align: center;
                .conTit {
                    width: 80%;
                    margin: 50px auto;
                    p:first-child {
                        height: 37px;
                        font-size: 26px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                        line-height: 37px;
                    }
                    p:last-child {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(64, 72, 82, 1);
                    }
                }
                .inputBox {
                    .newInput {
                        width: 342px;
                        margin-bottom:20px;
                    }
                    width: 342px;
                    display: flex;
                    height: 40px;
                    line-height: 40px;
                    margin: 40px auto;
                    text-align: center;
                    input {
                        border: 1px solid #ddd;
                        width: 300px;
                        height: 40px;
                        padding-left: 10px;
                    }
                    .msg {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(64, 72, 82, 1);
                        border: 1px solid #ddd;
                        padding: 0 8px;
                        width: 80px;
                    }
                    .code {
                        width: 110px;
                        border: 1px solid #ddd;
                        padding: 0 8px;
                        cursor: default;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(41, 178, 139, 1);
                    }
                }
                .phoneBox {
                    margin: 40px 0;
                }
                .button {
                    margin: 35px auto;
                    width: 200px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: rgba(41, 178, 139, 1);
                    border-radius: 2px;
                    font-size: 15px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    cursor: default;
                }
            }
        }
    }
}
</style>