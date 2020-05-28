import Vue from 'vue';
import App from './App.vue';
import routes from './config/routers';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueAliplayer from 'vue-aliplayer';
// 自己封装的axios
import http from "./config/http";

const router = new VueRouter({
    mode: 'hash',
    routes  
});
Vue.prototype.$http = http;
Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VueAliplayer);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')