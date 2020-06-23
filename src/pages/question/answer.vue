<template>
	<div class="exercise">
		<div class="exerciseBox">
			<div class="exerciseTitle">
				<div class="title flex-btween">
					<div class="leftTitle">答案结果</div>
					<!-- <div class="rightTime">00:10:10</div> -->
				</div>
				<div class="content flex-btween">
					<div class="leftQuestion">
						<div class="questionList" v-if="questionCur==index" v-for="(item,index) in questionList" :key="index">
							<div class="questionTitle"><span>{{index+1}}</span>.（{{item.type==1?'单选题':'多选题'}}）具有中枢抑制作用的抗胆碱药是    <span> 1分</span></div>
							<div class="optionsList">
								<div class="optionsItem flex" v-for="(answerItem,answerIndex) in item.list" :key="answerIndex">
									<div >
										<Icon type="ios-checkmark-circle" v-if="answerItem.isChecked" class="btns checked" />
										<Icon type="ios-checkmark-circle-outline" v-if="!answerItem.isChecked" class="btns" />
									</div>
									<div>{{answerItem.answer}}</div>
								</div>
							</div>
                            <div class="answer">
                                <div class='flex Atitle'>
                                    <p>正确答案：<b>A</b></p>
                                    <p>你的答案：<b>B</b></p>
                                </div>
                                <div class="flex analysis">
                                    <p>答案解析：</p>
                                    <div>阿片类药物常见的不良反应有：便秘，恶心、呕吐，嗜睡及过度镇静，尿储留，瘙痒，眩晕，精神错乱及中枢神经毒性反应，呼吸抑制等。(<麻醉药品临床应用指导原则》）</div>
                                </div>
                                <div class="flex typeBox">
                                    <div>
                                        <Icon type="md-heart-outline" />
                                        <span>收藏</span>
                                    </div>
                                    <div>
                                        <Icon type="ios-create-outline" />
                                        <span>反馈</span>
                                    </div>
                                </div>
                                <div class="line"></div>
                                <div class="correlation flex">
                                    <p>相关课程：</p>
                                    <div>
                                        暂无课程
                                    </div>
                                </div>
                            </div>
							<div class="btnBox flex-center">
								<div @click="previous(index)">上一题</div>
								<div @click="next(index)">下一题</div>
							</div>
						</div>
					</div>
					<div class="rightAnswer">
						<div class="answerTitle">答题卡</div>
						<div class="answerList">
							<div class="answerItem" v-for="(item,index) in 2" :key="index">
								<div class="listTitle">{{index==0?'单选题':'多选题'}}</div>
								<div class="listBox flex">
									<div class="item" :class="{acive:index%2==0}" v-for="(item,index) in 11" :key="index">{{index+1}}</div>
								</div>
							</div>
						</div>
						<div class="typeBox flex">
							<div class="type mistake flex">
								<span>正确</span>
								<div></div>
							</div>
							<div class="type correct flex">
								<span>错误</span>
								<div></div>
							</div>
                            <div class="type flex">
								<span>待批</span>
								<div></div>
							</div>
                            <div class="type unfinished flex">
								<span>未答</span>
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
	export default{
		data(){
			return {
				questionCur:0,
				questionList:[
					{
						title:"1.（单选题）具有中枢抑制作用的抗胆碱药是",
						type:1,
						list:[
							{answer:"资产保值，我不愿意承担任何投资风险",id:1,isChecked:false},
							{answer:"尽可能保证本金安全，不在乎收益率比较低 ",id:2,isChecked:false},
							{answer:"产生较多的收益，可以承担一定的投资风险",id:3,isChecked:true},
							{answer:"实现资产大幅增长，愿意承担很大的投资风险",id:4,isChecked:false},
						],
					},
					{
						title:"（单选题）具有中枢抑制作用的抗胆碱药是    ",
						type:2,
						list:[
							{answer:"资产保值，我不愿意承担任何投资风险",id:1,isChecked:false},
							{answer:"尽可能保证本金安全，不在乎收益率比较低 ",id:2,isChecked:false},
							{answer:"产生较多的收益，可以承担一定的投资风险",id:3,isChecked:true},
							{answer:"实现资产大幅增长，愿意承担很大的投资风险",id:4,isChecked:false},
						],
					},
				]
			}
		},
		methods:{
			choseAnswer(index,answerIndex,type){
				console.log(index,type);
				let list=this.questionList[index].list
				if(type==1){//单选
					list.map((item,i)=>{
						if(i==answerIndex){
							item.isChecked=true;
						}else{
							item.isChecked=false;
						}
					})
				}else if(type==2){
					list[answerIndex].isChecked=!list[answerIndex].isChecked
				}
				this.questionList[index].list=list;
			},
			previous(index){
				this.questionCur!=0?this.questionCur=index-1:this.questionCur
			},
			next(index){
			
				this.questionCur+1<this.questionList.length?this.questionCur=index+1:this.questionCur
			},
		}
	}
</script>

<style lang="less">
	body{
		background:#F5F6F6;
	}
	.exercise{
		width:100%;
		.exerciseBox{
			.exerciseTitle{
				width:100%;
				height:100px;
				background:rgba(255,255,255,1);
				.title{
					width:1200px;
					height:100%;
					margin:0 auto;
					font-size:22px;
					font-weight:600;
					.leftTitle{
						.num{
							color:#29B28B;
						}
					}
					.rightTime{
						
					}
				}
			}
			.content{
				width:1200px;
				margin:0 auto;
				align-items: flex-start;
				margin-top:20px;
				.leftQuestion{
					width:850px;
					padding:30px;
					box-sizing: border-box;
					background:#fff;
					padding:30px;
					box-sizing: border-box;
					.questionList{
						.questionTitle{
							font-size:16px;
							color:#1C1F21;
							span{
								color:#29B28B;
								margin-left:4px;
							}
						}
						.optionsItem{
							width:100%;
							height:60px;
							cursor: default;
							.btns{
								font-size:20px;
								margin-right:20px;
							}
							.checked{
								color:#29B28B;
							}
							color:#969696;
							font-size: 14px;
						}
                    }
                    .answer{
                        width:100%;
                        padding:15px;
                        box-sizing: border-box;
                        background:#F6F8FA;
                        .Atitle{
                            p{
                                margin-right:15px;
                                b{
                                    color:#1CBBFF;
                                }
                            }
                            p:last-child{
                                b{
                                    color:#FF2486;
                                }
                            }
                        }
                        .analysis{
                            align-items: flex-start;
                            margin-top:10px;
                            p{
                                width:100px;
                            }
                        }
                        .typeBox{
                            justify-content: flex-end;
                            margin-top:30px;
                            font-size:12px;
                            div{
                                margin-left:10px;
                                cursor: pointer;
                            }
                        }
                        .line{
                            width:100%;
                            height:1px;
                            background:#EBEEF2;
                            margin-top:10px;
                        }
                        .correlation{
                            margin-right:10px;
                            margin-top:10px;
                        }
                    }
					.btnBox{
						width:100%;
						div{
							width:240px;
							height:50px;
							background:rgba(220,220,220,1);
							border-radius:4px;
							text-align: center;
							line-height: 50px;
							font-size: 15px;
							color:#fff;
							margin:0 44px;
							margin-top:60px;
							cursor: default;
						}
						div:last-child{
							background:#29B28B;
						}
					}
				}
				.rightAnswer{
					width:330px;
					// height:316px;
					background:rgba(255,255,255,1);
					padding:30px;
					box-sizing: border-box;
					.answerTitle{
						width:100%;
						text-align: center;
						font-size: 18px;
						font-weight: 600;
					}
					.answerList{
						border-bottom:1px solid #F0F2F5;
						padding-bottom:30px;
						.answerItem{
							width:100%;
							margin-top:20px;
							.listTitle{
								font-size: 14px;
							}
							.listBox{
								flex-wrap: wrap;
								.item{
									width:24px;
									height:24px;
									border-radius:2px;
									// border:1px solid rgba(220,224,228,1);
									text-align: center;
									line-height: 24px;
									font-size:14px;
									margin-top:10px;
                                    margin-right:8px;
                                    background:#FF2486;
                                    color:#fff;
								}
								.item.acive{
									background:#1CBBFF;
									color:#fff;
                                }
                                .item.none{
                                    background:#EEEEF2;
									color:#000;
                                }
                                .item.Awaiting{
                                    background:#29B28B;
									color:#fff;
                                }
							}
						}
                    }
                    
					.typeBox{
						width:100%;
						.type{
							margin-right:20px;
							margin-top:20px;
							div{
								width:17px;
								height:17px;
								background:rgba(41,178,139,1);
								border-radius:2px;
								margin-left:6px;
							}
						}
						.unfinished{
							div{
								background:#C8CDD0;
							}
                        }
                        .correct{
                            div{
								background:#FF2486;
							}
                            
                        }

                        .mistake{
                            div{
								background:#1CBBFF;
							}
                            
                        }
					}
				}
			}
		}
	}
</style>
