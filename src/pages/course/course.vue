<template>
  <div class="content">
    <div class="typeBox">
      <div class="typeLine">
        <p class="typeTitle">分类：</p>
        <ul>
          <li class="active">全部</li>
          <li>药学知识</li>
          <li>药学技能</li>
          <li>药学管理</li>
          <li>人文医学</li>
        </ul>
      </div>
      <div class="typeLine">
        <p class="typeTitle">授课内容：</p>
        <ul>
          <li>全部</li>
          <li>高血压</li>
          <li>麻醉用药</li>
          <li>糖尿病</li>
          <li>特殊人群用药</li>
          <li>心血管系统</li>
          <li>中药</li>
          <li>肿瘤</li>
          <li>注射剂</li>
          <li>处方审核</li>
          <li>药学监护</li>
          <li>药物经济学</li>
          <li>药学教育</li>
        </ul>
      </div>
    </div>
    <div class="courseBox">
      <div class="flexBox">
        <div class="line">
          <ul class="type">
            <li class="active">全部</li>
            <li>最新</li>
            <li>最热</li>
          </ul>
          <div class="radioBox">
            <div class="radioItem">
              <img src="../../assets/imgs/radioed.png" alt class="radioImg" v-if="vipType==1" />
              <img src="../../assets/imgs/radio.png" alt class="radioImg" v-else />
              <span>免费</span>
            </div>
            <div class="radioItem">
              <img src="../../assets/imgs/radioed.png" alt class="radioImg" v-if="vipType==2" />
              <img src="../../assets/imgs/radio.png" alt class="radioImg" v-else />
              <span>vip</span>
            </div>
            <div class="radioItem">
              <img src="../../assets/imgs/radioed.png" alt class="radioImg" v-if="vipType==3" />
              <img src="../../assets/imgs/radio.png" alt class="radioImg" v-else />
              <span>付费</span>
            </div>
          </div>
        </div>
        <div class="listBox">
          <div class="courseList">
            <div class="courseItem" v-for="(item,index) in 16" :key="index" @click="choice">
              <img src alt class="top" />
              <div class="bottom">
                <div class="subTitle">第二届药健康科普中国行药师科普宣讲赋能中国行药师科普宣讲赋能讲赋能</div>
                <div class="price">
                  <div class="leftPrice">
                    <span class="free" v-if="index%2!=0">免费</span>
                    <span class="money" v-if="index%2==0">¥239</span>
                  </div>
                  <div class="rightClass">3课时</div>
                </div>
              </div>
            </div>
          </div>
          <div class="pageBox">
            <div class="page">
              <p>首页</p>
              <Page :total="100" prev-text="上一页" next-text="下一页"/>
              <p>尾页</p>
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
      vipType: "1"
    };
  },
  methods:{
    choice(){
      this.$router.push("/courseBuy");
    }
  }
};
</script>

<style scoped lang="less">
.content {
  // 分页样式
  /deep/ .ivu-page-item{
    border-radius:50%;
    margin:0 20px;
    border:0;
    color:#4D555D;
    font-size:14px;
    width:35px;
    height:35px;
    line-height:35px;
  }
  /deep/ .ivu-page-item-active{
    background:rgba(77,85,93,1);
    color:#fff;
  }
  /deep/ .ivu-page-item-active a, .ivu-page-item-active:hover a{
    color:#fff;
  }
  margin-bottom:80px;
  .typeBox {
    margin-bottom: 40px;
    .active {
      background: rgba(41, 178, 139, 0.2);
      border-radius: 4px;
      color: #29b28b;
      font-weight: 800;
    }
    font-family: PingFang-SC-Heavy, PingFang-SC;
    width: 1200px;
    margin: auto;
    cursor: pointer;
    .typeLine {
      display: flex;
      line-height: 34px;
      margin: 10px 0;
      height: auto;
    }
    .typeLine:first-child {
      padding-bottom: 18px;
      border-bottom: 1px solid #ebeef2;
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      height: auto;
      li {
        margin: 0 20px;
        text-align: center;
        height: 34px;
        padding: 0 12px;
        line-height: 34px;
        font-size: 14px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(28, 31, 33, 1);
      }
    }
    .typeTitle {
      width: 100%;
      display: inline-block;
      font-size: 14px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgba(7, 17, 27, 1);
      width: 76px;
      text-align: justify;
    }
  }
  .courseBox {
    width: 100%;
    border-top: 1px solid #ebeef2;
    cursor: pointer;
    .flexBox {
      width: 1200px;
      margin: 20px auto;
      .line {
        display: flex;
        align-items: center;
        ul {
          display: flex;
          font-size: 14px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          color: rgba(28, 31, 33, 1);
          line-height: 20px;
        }
        .type {
          .active {
            background: rgba(41, 178, 139, 1);
            border-radius: 17px;
            color: #fff;
          }
          li {
            text-align: center;
            width: 76px;
            height: 34px;
            line-height: 34px;
          }
        }
        .radioBox {
          display: flex;
          font-size: 14px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          color: rgba(28, 31, 33, 1);
          line-height: 20px;
          margin-left: 70px;
          .radioItem {
            margin: 0 20px;
          }
          .radioImg {
            vertical-align: middle;
            width: 15px;
            height: 15px;
            margin: 0 10px;
          }
        }
      }
      .courseList {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        .courseItem {
          width: 270px;
          height: 230px;
          margin-top: 40px;
          img {
            display: block;
            width: 270px;
            height: 150px;
            background: #ddd;
          }
          .bottom {
            width: 100%;
            height: 60px;
            padding: 0 20px 0 8px;
            box-sizing: border-box;
            .subTitle {
              margin-top: 10px;
              font-size: 16px;
              font-family: PingFang-SC-Heavy, PingFang-SC;
              font-weight: 800;
              color: rgba(7, 17, 27, 1);
              line-height: 22px;
              width: 100%;
              height: 44px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* 设置行数 */
              -webkit-box-orient: vertical;
            }
            .price {
              display:flex;
              align-items:center;
              justify-content:space-between;
              margin-top: 10px;
              .leftPrice {
                font-size: 16px;
                .free {
                  color: #3176ff;
                }
                .money {
                  color: #f83252;
                }
              }
              .rigthClass {
                color: #9199a1;
                font-size: 14px;
              }
            }
          }
        }
      }
      .pageBox{
        text-align:center;
        .page{
          display:inline-flex;
          height:35px;
          line-height:35px;
          color:#4D555D;
          font-size:14px;
        }
        p{
          margin:0 20px;
        }
        margin:50px auto;
      }
    }
  }
}
</style>
