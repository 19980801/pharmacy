<template>
  <div id="app">
    <!-- 头部 -->
    <header>
      <div class="header">
        <div>
          <router-link to="/">
            <img src="./assets/imgs/index/logo.png" mode="widthFix" alt class="logo" />
          </router-link>
          <nav>
            <router-link to="/" :class="routeName=='index'?'active':''">首页</router-link>
            <router-link to="/course" :class="routeName=='course'?'active':''">课程</router-link>
            <router-link to="/">题库</router-link>
          </nav>
        </div>
        <div>
          <div class="searchBox">
            <div class="search">
              <div class="left">
                <div class="select" @click="showSelect">
                  <span>课程</span>
                  <img src="./assets/imgs/index/down.png" alt />
                </div>
                <input type="text" placeholder="请输入要查找的内容" @focus="clickInput" v-model="searchKey" @blur="hideHistory" />
                <img src="./assets/imgs/index/clear.png" alt class="clear" v-show="searchKey" @click="clearSearchKey" />
              </div>
              <div class="searchImg">
                <img src="./assets/imgs/index/search.png" alt />
              </div>
            </div>
            <!-- 下拉内容 -->
            <div class="selectContent" v-show="selectShow">
              <ul>
                <li class="active">课程</li>
                <li>题库</li>
                <li>活动</li>
              </ul>
            </div>
            <!-- 历史搜索内容 -->
            <div class="historyContent" v-show="historyShow">
              <div class="content">
                <span>历史搜索</span>
                <ul>
                  <li>中药</li>
                  <li>河豚健康科普三堂课</li>
                  <li>中药</li>
                  <li>河豚健康科普三堂课</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 未登录 -->
          <div class="login" v-if="nologin">
            <span>登录</span>
            <span>注册</span>
          </div>
          <!-- 已登录 -->
          <div class="logined" v-else>
            <div class="msgBox">
              <router-link to="/notice">
                <img src="./assets/imgs/index/msg.png" alt />
              </router-link>
            </div>
            <div class="userBox">
              <div @click="showLogin">
                <img src="./assets/imgs/index/userImg.png" alt class="userImg" />
                <span>小酒窝</span>
              </div>
              <div class="loginList" v-show="showLoginList">
                <ul>
                  <li class="active">
                    <router-link to="/">学习记录</router-link>
                  </li>
                  <li>
                    <router-link to="/">我的收藏</router-link>
                  </li>
                  <li class="line">
                    <router-link to="/">学习任务</router-link>
                  </li>
                  <li>
                    <router-link to="/">我的订单</router-link>
                  </li>
                  <li>
                    <router-link to="/">会员管理</router-link>
                  </li>
                  <li class="line">
                    <router-link to="/">职业认证</router-link>
                  </li>
                  <li>
                    <router-link to="/">个人设置</router-link>
                  </li>
                  <li class="line">
                    <router-link to="/">我的反馈</router-link>
                  </li>
                  <li>
                    <router-link to="/">退出登录</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!--内容-->
    <section>
      <router-view v-if="isRouterAlive"></router-view>
    </section>
    <!-- 底部 -->
    <footer>
      <div class="footer">
        <p>友情链接</p>
        <div class="footContents">
          <ul>
            <li>
              <router-link to="/">中国健康促进基金会</router-link>
            </li>
            <li>
              <router-link to="/">国家卫生健康委员会</router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="/">MKM医药知识管理专项基金</router-link>
            </li>
            <li>
              <router-link to="/">美国卫生系统药师协会</router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="/">马博士健康在线</router-link>
            </li>
            <li>
              <router-link to="/">日本病院药剂师会</router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="/">国家食品药品监督管理总局</router-link>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <span>Copyright © 2019 Careal. All Rights Reserved.</span>
          <ul class="bottomMsg">
            <li>
              <router-link to="/">关于我们</router-link>
            </li>
            <li>
              <router-link to="/">常见问题</router-link>
            </li>
            <li>
              <router-link to="/">联系我们</router-link>
            </li>
            <li>
              <router-link to="/">浏览器下载</router-link>
            </li>
            <li>
              <router-link to="/">京ICP备09093936号-2</router-link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
		<!-- 登录注册弹框 -->
		<div class="loginModel" v-if="showModel">
		  <div class="login" v-if="login">
				<Icon type="ios-close" class="close" @click="close" sice="20" />
		    <div class="loginTitle flex">
		      <div class="log" :class="{active:loginCur==0}" @click="loginType(0)">
						<span>登录</span>
						<p></p>
					</div>
		      <div class="reg" :class="{active:loginCur==1}" @click="loginType(1)">
						<span>注册</span>
						<p></p>
					</div>
		    </div>
				<div class="inpList">
					<div class="inpItem">
						<input type="text" value="" placeholder="请输入手机号" />
						<p>手机号格式不正确</p>
					</div>
					<div class="inpItem" v-if="loginCur==1">
						<div class="verifyBox flex">
							<input type="text" value="" placeholder="请输入图片验证码" />
							<div class="">5678</div>
						</div>
						<p>手机号格式不正确</p>
					</div>
					<div class="inpItem verifyByPhone" v-if="loginCur==1">
						<div class="verifyBox flex">
							<input type="text" value="" placeholder="请输入验证码" />
							<div class=""><p>获取验证码</p></div>
						</div>
						<p>手机号格式不正确</p>
					</div>
					<div class="inpItem">
						<input type="text" value="" placeholder="请输入密码" />
						<p>手机号格式不正确</p>
					</div>
					<div class="saveLogin">
						<div class="flex" v-if="loginCur==1">
							<img :src="checked?checkAUrl:checkUrl" alt="" @click="choseType">
							<span>我已同意并阅读<span style="color:#29B28B;cursor: default;">【用户条款】</span></span>
						</div>
						<div class=" flex-btween" v-if="loginCur==0">
							<div class="flex">
								<img :src="checked?checkAUrl:checkUrl" alt="" @click="choseType">
								<span>10天内自动登录</span>
							</div>
							<div @click="backPassword" style="cursor: default;">忘记密码</div></div>
						</div>
					<div class="btn" v-if="loginCur==0">登录</div>
					<div class="btn" v-if="loginCur==1">注册</div>
				</div>
		  </div>
			<!-- 找回密码 -->
			<div class="login backPassword" v-if="!login"  sice="20">
				<Icon type="ios-arrow-back" @click="back" class="close" />
			  <div class="loginTitle flex-center">
			    <div>找回密码</div>
			  </div>
				<div class="inpList">
					<div class="inpItem">
						<input type="text" value="" placeholder="请输入手机号" />
						<p>手机号格式不正确</p>
					</div>
					<div class="inpItem">
						<div class="verifyBox flex">
							<input type="text" value="" placeholder="请输入图片验证码" />
							<div class="">5678</div>
						</div>
						<p>手机号格式不正确</p>
					</div>
					<div class="inpItem verifyByPhone">
						<div class="verifyBox flex">
							<input type="text" value="" placeholder="请输入验证码" />
							<div class=""><p>获取验证码</p></div>
						</div>
						<p>手机号格式不正确</p>
					</div>
					<div class="inpItem">
						<input type="text" value="" placeholder="请输入密码" />
						<p>手机号格式不正确</p>
					</div>
					<div class="saveLogin">
						<div class="flex">
							<img :src="checked?checkAUrl:checkUrl" alt="" @click="choseType">
							<span>我已同意并阅读<span style="color:#29B28B;cursor: default;">【用户条款】</span></span>
						</div>
					</div>
					<div class="btn">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      showLoginList:false,      //显示用户列表
      selectShow: false,        //头部下拉框内容
      historyShow: false,       //历史搜索内容
      nologin: false,           //登录状态
      routeName:"/",            //当前路由
      searchKey:"",             //搜索关键字
			showModel: false,
			loginCur:0,
			checked:true,
			checkUrl:require("./assets/imgs/index/loginCheck.png"),
			checkAUrl:require("./assets/imgs/index/loginCheckA.png"),
			login:true
    };
  },
  created(){
    
  },
  methods: {
		// 找回密码
		backPassword(){
			this.login=false;
		},
		// 关闭弹出层
		close(){
			this.showModel=false;
		},
		// 返回上层
		back(){
			this.login=true;
		},
		// 登录/注册选项卡
		loginType(i){
			this.loginCur=i;
		},
		// 选择登录保存
		choseType(){
			this.checked=!this.checked;
		},
    // header动画效果
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    // 点击打开选择框
    showSelect(){
      this.selectShow=!this.selectShow;
    },
    // 输入框获取焦点事件
    clickInput(){
      this.historyShow=true;
    },
    // 隐藏历史搜索记录
    hideHistory(){
      this.historyShow=false;
    },
    // 清除搜索框
    clearSearchKey(){
      this.searchKey="";
    },
    // 点击显示用户列表
    showLogin(){
      this.showLoginList=!this.showLoginList;
    }
  },
  // 监听当前路由
  watch:{
    $route(to,from){
      console.log(this.$route.name);
      this.routeName=this.$route.name;
    }
  },
};
</script>

<style lang="less">
// 公共样式
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-family: "PingFang-SC-Medium,PingFang-SC;";
}
a {
  text-decoration: none;
  color: #333333;
}
ul > li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
input{
	border:0;
}
.flex-btween {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex {
  display: flex;
  align-items: center;
}
.flex-center{
	display: flex;
	align-items: center;
	justify-content: center;
}
.flex-center{
	display: flex;
	align-items: center;
	justify-content: center;
}
.flex-end{
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
#app {
  width: 100%;
  // 头部
  header {
    box-shadow: 0px 6px 12px 0px rgba(24, 31, 29, 0.08);
    background: rgba(255, 255, 255, 1);
    height: 78px;
    line-height: 78px;
    padding: 0 15%;
    .header {
      width: 1200px;
      margin: auto;
      display:flex;
      justify-content:space-between;
    }
    div,
    nav {
      display: inline-block;
    }
    .logo {
      // width:92px;
      height:64px;
      border-radius: 50%;
      margin-right: 94px;
      vertical-align: middle;
    }
    nav {
      a {
        display: inline-block;
        width: 94px;
        height: 78px;
        text-align: center;
        color:#333;
      }
      a.active {
        background: #29b28b;
        color: #ffffff;
      }
    }
    .searchBox {
      border: 1px solid #29b28b;
      width: 350px;
      height: 50px;
      line-height: 50px;
      vertical-align: middle;
      box-shadow: 0px 6px 12px 0px rgba(24, 31, 29, 0.08);
      border-radius: 4px;
      position: relative;
      .search {
        display: flex;
        .left {
          width: 300px;
          display: flex;
          align-items: center;
          position: relative;
          .clear {
            position: absolute;
            right: 0;
            top: 10px;
          }
          .select {
            cursor: pointer;
            width: 64px;
            text-align: center;
            border-right: 1px solid rgba(230, 235, 240, 1);
            img {
              width: 18px;
              height: 18px;
              display: inline-block;
              vertical-align: middle;
            }
          }
          input {
            height: 46px;
            padding: 0 0 0 10px;
            border: 0;
            outline: none;
            caret-color: #29b28b;
            font-size: 14px;
            ::placeholder {
              color: rgba(180, 180, 180, 1);
              line-height: 20px;
              text-shadow: 0px 6px 12px rgba(24, 31, 29, 0.08);
            }
          }
        }
        .searchImg {
          cursor: pointer;
          border-radius: 0 4px 4px 0;
          text-align: center;
          width: 50px;
          height: 50px;
          background: rgba(41, 178, 139, 1);
          box-shadow: 0px 6px 12px 0px rgba(24, 31, 29, 0.08);
          border-radius: 0px 4px 4px 0px;
          img {
            vertical-align: middle;
          }
        }
      }
      .selectContent {
        z-index:999;
        position: absolute;
        top: 55px;
        cursor: pointer;
        ul {
          height: 140px;
          li {
            margin: 5px 0;
            height: 40px;
            line-height: 40px;
          }
          .active {
            color: #29b28b;
          }
        }
        width: 64px;
        height: 140px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 8px 8px rgba(24, 31, 29, 0.08);
        border-radius: 2px;
      }
      .historyContent {
        z-index:999;
        position: absolute;
        top: 55px;
        width: 350px;
        height: 230px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 8px 8px rgba(24, 31, 29, 0.08);
        border-radius: 2px;
        .content {
          span {
            margin: 20px;
            width: 48px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(162, 162, 162, 1);
            line-height: 17px;
          }
          ul {
            margin: 0 20px;
            li {
              height: 40px;
            }
          }
        }
      }
    }
    .login {
      margin-left: 57px;
      width: 117px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      cursor: pointer;
      :first-child::after {
        content: "|";
        padding: 20px;
      }
    }
    .logined {
      margin-left: 24px;
      .msgBox {
        img {
          width: 20px;
          vertical-align: middle;
        }
      }
      .userImg {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        margin: 0 12px 0 28px;
        vertical-align: middle;
      }
      .userBox {
        position: relative;
        cursor: pointer;
      }
      .loginList {
        z-index: 999;
        position: absolute;
        top: 70px;
        left: 10px;
        width: 138px;
        height: 412px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 8px 8px rgba(24, 31, 29, 0.08);
        border-radius: 2px;
        ul {
          padding:20px 16px;
        }
        li {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          a{
            color:#333;
          }
        }
        li.active a {
          color: #29b28b;
        }
        .line {
          border-bottom: 1px solid #ebeef2;
          margin:4px 0;
        }
      }
    }
  }
  // 内容
  section {
    min-height:800px;
  }
  // 底部
  footer {
    background: #020713;
    height: 400px;
    color: #fff;
    padding: 0 360px;
    padding: 0 15%;
    .footer {
      width: 1200px;
      margin: 0 auto;
    }
    p {
      padding: 49px 0;
      font-size: 22px;
      margin: 0;
    }
    .footContents {
      border-bottom: 1px solid #fff;
      margin-bottom: 47px;
      ul {
        display: inline-block;
        margin: 0 110px 41px 0;
      }
      li {
        font-size: 14px;
        height: 42px;
        line-height: 42px;
      }
      a {
        color: #fff;
      }
    }
    .bottom {
      text-align: center;
      .bottomMsg {
        margin-top: 20px;
        a {
          color: #fff;
        }
        li {
          display: inline-block;
        }
        li::after {
          content: "|";
          padding: 0 20px;
        }
        li:last-child::after {
          content: "";
        }
      }
    }
  }
	.loginModel {
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.6);
	  position: fixed;
	  top: 0;
	  left: 0;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  z-index: 99999;
	  .login {
	    width: 380px;
	    padding:20px 30px;
	    box-sizing: border-box;
	    background: #fff;
	    position: relative;
			.close{
				font-size: 40px;
				position: absolute;
				top:20px;
				right:15px;
			}
	    .loginTitle {
	      font-size: 16px;
				div{
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					cursor:default;
					p{
						width:16px;
						height:4px;
						border-radius:2px;
						margin-top:4px;
					}
				}
				.reg{
					margin-left:60px;
				}
				div.active{
					font-size: 18px;
					color:#29B28B;
					font-weight: bold;
					p{
						background:#29B28B;
					}
				}
	    }
			.inpList{
				width:100%;
				margin-top:30px;
				.inpItem,.verifyByPhone{
					width:100%;
					height:50px;
					margin-top:25px;
					input{
						width:100%;
						height:48px;
						background:#F2F2F2;
						padding:0 20px;
						box-sizing: border-box;
						font-size: 14px;
						border-radius: 2px;
					}
					.verifyBox{
						input{
							width:70%;
						}
						div{
							width:110px;
							text-align: center;
							margin-left:10px;
							line-height: 48px;
						}
					}
					p{
						padding:0 10px;
						box-sizing: border-box;
						color:#f00;
						margin-top:5px;
					}
				}
				.verifyByPhone{
					border-radius: 2px;
					background:#F2F2F2;
					.verifyBox{
						div{
							p{
								width:100%;
								height:30px;
								border-left:1px solid #ddd;
								font-size: 14px;
								color:#29B28B;
								text-align: center;
								line-height: 30px;
								cursor: default;
							}
						}
					}
				}
				.saveLogin{
					margin-top:25px;
					div{
						font-size: 14px;
						img{
							width:16px;
							height:16px;
						}
						span{
							height:16px;
							line-height: 16px;
							margin-left:6px;
						}
					}
				}
				.btn{
					width:100%;
					height:48px;
					background:#ddd;
					color:#fff;
					text-align: center;
					line-height: 48px;
					font-size: 18px;
					margin-top:40px;
					border-radius: 6px;
					cursor: default;
				}
			}
	  }
		.backPassword{
			.close{
				position: absolute;
				left:30px;
				font-size:24px;
				font-weight: 300;
			}
		}
	}
}
</style>
