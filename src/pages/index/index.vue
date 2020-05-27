<template>
  <div class="index">
		<!-- 轮播图 -->
    <div class="bannerBox">
			<Carousel autoplay class="banner">
				<Carousel-item>
						<div class="demo-carousel">1</div>
				</Carousel-item>
				<Carousel-item>
						<div class="demo-carousel">2</div>
				</Carousel-item>
				<Carousel-item>
						<div class="demo-carousel">3</div>
				</Carousel-item>
				<Carousel-item>
						<div class="demo-carousel">4</div>
				</Carousel-item>
		</Carousel>
    </div>
		<!-- 最新课程 -->
		<div class="newCourse courseBox">
			<div class="flexBox">
				<div class="title flex-btween">
					<div class="left">最新课程</div>
					<div class="right">
						<span>查看更多</span>
						<Icon type="ios-arrow-forward" />
					</div>
				</div>
				<div class="courseList">
					<div class="courseItem" v-for="(item,index) in 8" :key="index">
						<img src="" alt="" class="top">
						<div class="bottom">
							<div class="subTitle">第二届药健康科普中国行药师科普宣讲赋能中国行药师科普宣讲赋能讲赋能</div>
							<div class="price flex-btween">
								<div class="leftPrice">
									<span class="free" v-if="index%2!=0">免费</span>
									<span class="money" v-if="index%2==0">¥239</span>
								</div>
								<div class="rightClass">3课时</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 热门课程 -->
		<div class="hotCourse courseBox">
			<div class="flexBox">
				<div class="title flex-btween">
					<div class="left">热门课程</div>
					<div class="right">
						<span>查看更多</span>
						<Icon type="ios-arrow-forward" />
					</div>
				</div>
				<div class="courseList">
					<div class="courseItem" v-for="(item,index) in 8" :key="index">
						<img src="" alt="" class="top">
						<div class="bottom">
							<div class="subTitle">第二届药健康科普中国行药师科普宣讲赋能中国行药师科普宣讲赋能讲赋能</div>
							<div class="price flex-btween">
								<div class="leftPrice">
									<span class="free" v-if="index%2!=0">免费</span>
									<span class="money" v-if="index%2==0">¥239</span>
								</div>
								<div class="rightClass">3课时</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> 
		<!-- 免费课程 -->
		<div class="freeCourse courseBox">
			<div class="flexBox">
				<div class="title flex-btween">
					<div class="left">免费课程</div>
					<div class="right">
						<span>查看更多</span>
						<Icon type="ios-arrow-forward" />
					</div>
				</div>
				<div class="courseList">
					<div class="courseItem" v-for="(item,index) in 8" :key="index">
						<img src="" alt="" class="top">
						<div class="bottom">
							<div class="subTitle">第二届药健康科普中国行药师科普宣讲赋能中国行药师科普宣讲赋能讲赋能</div>
							<div class="price flex-btween">
								<div class="leftPrice">
									<span class="free" v-if="index%2!=0">免费</span>
									<span class="money" v-if="index%2==0">¥239</span>
								</div>
								<div class="rightClass">3课时</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 登录注册弹框 -->
		<div class="loginModel" v-if="showModel">
			<div class="login">
				<div class="loginTitle flex-btween">
					<div class="log">登录</div>
					<div class="reg">注册</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      showArrow: "never",
      speed: 5000,
      valueCal: 0,
			showModel:false
    };
  }
};
</script>

<style scoped lang="less">
	.flex-btween{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
.index {
  .bannerBox {
    width: 100%;
		height:450px;
		.banner{
			width:100%;
			height:100%;
			background:#ddd;
			text-align: center;
			line-height: 450px;
		}
  }
	.courseBox{
		width:100%;
		height:660px;
		background:#fff;
		.flexBox{
			width:1200px;
			height:100%;
			padding:40px 0;
			box-sizing: border-box;
			margin:0 auto;
			.title{
				font-size: 24px;
				.right{
					font-size: 14px;
					color:#29B28B;
				}
			}
			.courseList{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: space-between;
				.courseItem{
					width:270px;
					height:230px;
					// background:#ddd;
					margin-top:40px;
					img{
						display: block;
						width:270px;
						height:150px;
						background:#ddd;
					}
					.bottom{
						width:100%;
						height:60px;
						padding:0 20px 0 8px;
						box-sizing: border-box;
						.subTitle{
							margin-top:10px;
							font-size:16px;
							font-family:PingFang-SC-Heavy,PingFang-SC;
							font-weight:800;
							color:rgba(7,17,27,1);
							line-height:22px;
							width:100%;
							height:44px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp:2;  /* 设置行数 */
							-webkit-box-orient: vertical;
						}
						.price{
							margin-top:10px;
							.leftPrice{
								font-size: 16px;
								.free{
									color:#3176FF;
								}
								.money{
									color:#F83252;
								}
							}
							.rigthClass{
								color:#9199A1;
								font-size: 14px;
							}
						}
					}
					// margin:30px 30px 0 0 ;
				}
			}
		}
	}
	.hotCourse{
		background:#ECEFF2;
	}
	.loginModel{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.6);
		position: fixed;
		top:0;
		left:0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99999;
		.login{
			width:380px;
			padding:30px;
			box-sizing: border-box;
			background:#fff;
			position: relative;
			div{
				font-size: 32px;
			}
		}
	}
}
</style>