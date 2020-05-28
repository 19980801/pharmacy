
<template>
  <div class="content">
    <div class="p-padding">
      <div class="">
        <div class="prism-player" id="prismPlayer"></div>
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
      height: "490px",      // 播放器高度
      playsinline: true,
      seekable: true,
      skinLayout: [{
        "name": "bigPlayButton",
        "align": "cc"
        //"x": 30,
        //"y": 80
      }, {
        "align": "blabs",
        "x": 0,
        "y": 0,
        "name": "controlBar",
        "children": [
          {
            "align": "tl",
            "x": 15,
            "y": 26,
            "name": "playButton"
          }, {
            "align": "tl",
            "x": 10,
            "y": 24,
            "name": "timeDisplay"
          }, {
            "align": "tr",
            "x": 20,
            "y": 25,
            "name": "fullScreenButton"
          }, {
            "align": "tr",
            "x": 20,
            "y": 25,
            "name": "volume"
          },
          {
            "name": "progress",
            "align": "tlabs",
            "x": 0,
            "y": 0
          }
        ]
      }]
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.content{
  
}
</style>