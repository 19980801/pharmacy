<template>
  <div class="content">
    <div class="notice">
      <div class="left">
        <ul>
          <li class="active">全部通知</li>
          <li>系统通知</li>
          <li>考核通知</li>
          <li>审批通知</li>
          <li>成绩通知</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="goDetail">
            <div>
              <i class="dot"></i>
            </div>
            <div>
                <img src="../../assets/imgs/index/logo.png" alt="" class="infoImg">
            </div>
            <div class="con">
              <span class="title">8月29号系统更新通知</span>
              <div class="info">“东方启明星”青年表演工作坊和“东方海星”海归青年俱乐部共同主办了公司第六届职工文化艺术节青年协会主题活动“欢乐音雄”配音大赛，听到这个消息后立刻产生了浓厚的感兴趣一拍即合自发组成了一支队伍参加比赛 ……</div>
              <p class="time">2020-09-01</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        list:[
            {id:1},
            {id:1},
            {id:1},
            {id:1},
            {id:1},
        ]
    };
  },
  methods:{
    goDetail(){
      this.$router.push("/noticeDetail");
    }
  }
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  background: #f5f6f6;
  padding: 1% 15%;
  height: 100vh;
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
        display: flex;
        justify-content: space-between;
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