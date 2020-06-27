import Vue from 'vue';
import App from './App.vue';
import routes from './config/routers';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VideoPlayer from 'vue-video-player';
//引入 hls,视频直播(m3u8)必须引入的
// import 'videojs-contrib-hls'
//播放rtmp视频
// import 'videojs-flash'
// 自己封装的axios
import http from "./config/http";

const router = new VueRouter({
    mode: 'hash',
    routes  
});
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
//如果你需要自定义播放器的样式，自己新建一个css
require('./assets/css/video.css');
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.prototype.host = "http://192.168.2.146:8080";            

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VideoPlayer);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')