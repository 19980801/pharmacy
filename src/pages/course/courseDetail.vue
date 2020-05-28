
<template>
  <div class="content">
    <div class="videoBox">
      <p class="title">全部课程\河豚健康科普三堂课</p>
      <div class="videoTop">
        <div class="prism-player" id="prismPlayer"></div>
        <div class="videoRight">
          <ul>
            <li class="item">
              <div class="itemTitle">
                <p>录播</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {

    }
  },
  mounted: function () {
    // 初始化播放器
    var player = new Aliplayer({
      id: "prismPlayer", // 容器id
      source: "http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4",  //视频地址
      cover: "http://cdn.img.mtedu.com/images/assignment/day_3.jpg",      //播放器封面图
      autoplay: false,      // 是否自动播放
      width: "870px",       // 播放器宽度
      height: "auto",      // 播放器高度
      playsinline: true,
      seekable: true
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.content {
  .videoBox {
    width: 1200px;
    margin: auto;
    .title {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(77, 85, 93, 1);
      line-height: 20px;
      margin: 30px 0 20px;
    }
    .videoTop {
      display: flex;
      .videoRight {
        padding:20px;
        width: 330px;
        height: 490px;
        overflow-y:scroll;
        background: rgba(19, 19, 19, 1);
        .item{
            .itemTitle p{
                width:24px;
                height:17px;
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(19,19,19,1);
                line-height:17px;
            }
        }
      }
    }
  }
}
</style>