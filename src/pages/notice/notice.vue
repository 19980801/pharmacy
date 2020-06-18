<template>
  <div class="content">
    <div class="notice">
      <div class="left">
        <ul>
          <li @click="choseTab(index)" :class="{active:index==cur}" v-for="(item,index) in leftList" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item,index) in mesList.content" :key="index" @click="goDetail(item.id)">
            <div>
              <i class="dot" :class="{doted:item.messageStatus==0}"></i>
            </div>
            <div>
                <!-- <img src="../../assets/imgs/index/logo.png" alt="" class="infoImg"> -->
            </div>
            <div class="con">
              <span class="title">{{item.informTitle}}</span>
              <div class="info">{{item.informContent}}</div>
              <p class="time">{{item.createTime}}</p>
            </div>
          </li>
        </ul>
        <div style="display:flex;justify-content:center">
          <Page v-if="showPage" @on-change="changeSize" :total='mesList.totalElements' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftList:[
        {id:1,name:'全部通知'},
        {id:2,name:'系统通知'},
        {id:3,name:'考核通知'},
        {id:4,name:'审批通知'},
        {id:5,name:'成绩通知'},
      ],
      cur:0,
      page:1,
      size:10,
      mesList:{},
      showPage:false
    };
  },
  mounted(){
    this.findMes();
  },
  methods:{
    changeSize(e){
      this.page=e;
      this.findMes();
    },
    // 查询消息通知
    findMes(){
      let data={
        pageNum:this.page,
        paegSize:this.size,
        informType:this.cur==0?'':this.cur-1
      }
      this.$http.post('inform/pageQuery',data).then(res=>{
        if(res.code==0){
          this.mesList=res.data;
          if(this.mesList.content.length==0){
            this.showPage=false
          }else{
            this.showPage=true
          }
        }
      })
    },
    choseTab(i){
      this.cur=i;
      this.findMes();
    },
    goDetail(id){
      this.$router.push({path:"/noticeDetail",query:{id:id}});
      // this.$router.push("/noticeDetail");
    }
  }
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  background: #f5f6f6;
  padding: 1% 15%;
  // height: 100vh;
  .notice {
    // 选中颜色
    .active {
      color: #1cb38a;
    }
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .left {
      padding: 15px 96px 15px 68px;
      font-size: 14px;
      width: 220px;
      height: 360px;
      background: #fff;
      ul li {
        height: 64px;
        line-height: 64px;
      }
    }
    .right {
      background: #fff;
      width: 960px;
      height: auto;
      padding: 2%;
      li {
        width:100%;
        display: flex;
        // justify-content: space-between;
        margin-bottom:10px;
      }
      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #dce5ec;
        margin-top:9px;
      }
      .doted{
        background:#1cb38a;
      }
      .con {
        width:900px;
        margin-left: 15px;
        border-bottom:1px solid #F0F0F0;
        .title {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #333;
          line-height: 28px;
        }
        .infoImg{
            width:112px;
            height:112px;
        }
        .info {
          line-height: 28px;
          font-size: 14px;
          font-family: MicrosoftYaHeiLight;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .time{
            font-size:14px;
            font-family:MicrosoftYaHeiLight;
            color:rgba(153,153,153,1);
            line-height:19px;
            margin:10px auto 15px;
        }
      }
    }
  }
}
</style>