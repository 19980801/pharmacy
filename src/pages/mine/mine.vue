<template>
	<div class="mine">
		<div class="mineBox flex-btween">
			<div class="left">
				<div class="leftTitle" @click="choseTabBar(index)" :class="{leftActive:leftCur==index}" v-for="(item,index) in leftList" :key="index">{{item.name}}</div>
			</div>
			<div class="rightContent">
				<!-- 学习记录 -->
				<div class="learningBox rightBox" v-if="leftCur==0">
					<div class="tabCar flex">
						<div :class="{tabActive:learningCur==index}" @click="choseLearningTab(index)" v-for="(item,index) in learningList" :key="index">{{item.name}}</div>
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
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				leftList:[
					{name:"学习记录",id:1},
					{name:"我的收藏",id:2},
					{name:"学习任务",id:3},
					{name:"我的订单",id:4},
					{name:"会员管理",id:5},
					{name:"个人设置",id:6},
					{name:"职业认证",id:7},
					{name:"我的反馈",id:8},
				],
				learningList:[{name:"在学课程",id:1},{name:"错题本",id:2}],
				leftCur:0,//侧边栏选项卡
				learningCur:0//学习记录选项卡
			}
		},
		methods:{
			// 学习记录选项卡
			choseLearningTab(i){
				this.learningCur=i;
			},
			// 侧边选项卡
			choseTabBar(i){
				this.leftCur=i;
			}
		}
	}
</script>

<style lang="less">
	body{
		background:#F5F6F6;
	}
	.mine{
		width:100%;
		padding:50px 0;
		box-sizing: border-box;
		.mineBox{
			width:1200px;
			margin:0 auto;
			align-items: flex-start;
			.left{
				width:220px;
				height:548px;
				background:#fff;
				display: flex;
				align-items: center;
				flex-direction: column;
				border-radius:2px;
				.leftTitle{
					width:70px;
					height:70px;
					text-align: center;
					line-height: 70px;
					font-size: 14px;
					color:#666666;
					cursor: default;
				}
				.leftTitle.leftActive{
					color:#1CB38A
				}
			}
			.rightContent{
				width:960px;
				background:#fff;
				border-radius:2px;
				.rightBox{
					.tabCar{
						width:100%;
						height:68px;
						border-bottom:1px solid #F0F2F5;
						padding:0 30px;
						box-sizing: border-box;
						div{
							width:110px;
							height:100%;
							background:#fff;
							font-size: 14px;
							color: #313436;
							text-align: center;
							line-height: 68px;
							cursor: default;
						}
						div.tabActive{
							color:#29B28B;
							font-size: 18px;
							border-bottom:1px solid #29B28B;
						}
					}
				}
				.learningBox{
					.classList{
						width:100%;
						background:#fff;
						.classItem{
							width:100%;
							height:210px;
							background:#fff;
							padding:0 30px;
							box-sizing: border-box;
							.leftImg{
								width:270px;
								height:150px;
							}
							.rightClassTitle{
								padding-left:30px;
								box-sizing: border-box;
								width:630px;
								height:150px;
								border-bottom:1px solid #F0F2F5;
								position: relative;
								.studyBtn{
									width:98px;
									height:34px;
									background:rgba(41,178,139,1);
									border-radius:2px;
									font-size:15px;
									color:#fff;
									text-align: center;
									line-height: 34px;
									position: absolute;
									right:0;
									bottom:20px;
									cursor: default;
								}
								.topTitle{
									width:100%;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									font-size: 16px;
									font-weight: 600;
								}
								.validityTime{
									margin-top:55px;
									.validityTimeBox{
										color:#B4B6BC;
									}
									p{
										margin:10px 0;
									}
									.collectBox{
										margin-top:20px;
										margin-left:30px;
										font-size:14px;
										color:#07111B;
										span{
											margin-left:10px;
										}
									}
									.collectBox.active{
										color:#FF077A;
									}
								}
							}
						}
					}
					.errorsList{
						width:100%;
						background:#fff;
						.errorsItem{
							width:100%;
							padding:0 30px;
							box-sizing: border-box;
							height:70px;
							.errorsTitleBox{
								font-size: 16px;
								span{
									color:#29B28B;
								}
								p{
									color:#1C1F21;
									font-weight: 600;
								}
							}
							.errorsBtn{
								width:140px;
								height:40px;
								border-radius:2px;
								border:1px solid rgba(41,178,139,1);
								text-align: center;
								color:rgba(41,178,139,1);
								line-height: 40px;
								cursor: default;
							}
						}
					}
				}
			}
		}
	}
	
</style>
